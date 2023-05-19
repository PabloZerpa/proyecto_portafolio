
const pool = require('../config');
const { generarLogAuditoria } = require('../helpers/auditoria');

const { 
    insertarAplicacion, 
    insertarPlataforma, 
    insertarLenguaje, 
    insertarMantenimiento, 
    insertarDocumentacion, 
    insertarServidor, 
    insertarBase,
    insertarCustodio
} = require('../helpers/verificaciones');
        
const query = `
    SELECT 
        aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_version,
        alcance,estatus,prioridad,apl_direccion,region,
        apl_codigo_fuente,apl_critico,frecuencia,plataforma
    FROM aplicaciones
        LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
        LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
        LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
        LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
        LEFT JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
        LEFT JOIN frecuencias ON frecuencias.frecuencia_id = mantenimientos.man_frecuencia
        LEFT JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
        LEFT JOIN plataformas ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
`;



/* 
    ***********************************                             ***********************************
    *********************************** CREATE-READ-UPDATE-DELETE   ***********************************
    ***********************************                             ***********************************
*/

// *********************************** CREAR REGISTRO ***********************************
const registrarAplicacion = async (req,res) => {
    try {
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,apl_usuario_registro,
            plataforma,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            
            select_lenguaje, select_base, select_servidor,select_documentos,
            select_funcional, select_tecnico
        } = req.body;

        const query = await pool.query(
            `SELECT * FROM aplicaciones WHERE apl_acronimo = ? OR apl_nombre = ?`, 
            [apl_acronimo,apl_nombre]);
        const app = query[0][0];

        // ****************************** VERIFICA QUE LA APLICACION NO EXISTA ******************************
        if(app){
            console.log('ERROR, APLICACION YA EXISTE');
            return res.status(401).json({ message: 'ERROR, APLICACION YA EXISTE' });
        }
        else{   

            const aplicacion_id = await insertarAplicacion(
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                apl_codigo_fuente,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region,
                apl_usuario_registro
            );

            await insertarPlataforma(aplicacion_id, plataforma);
            await insertarLenguaje(aplicacion_id, select_lenguaje);    
            await insertarServidor(aplicacion_id,select_servidor);
            await insertarBase(aplicacion_id,select_base);
            await insertarCustodio('funcional',aplicacion_id,select_funcional);
            await insertarCustodio('tecnico',aplicacion_id,select_tecnico);
            await insertarMantenimiento(aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales);          
            await insertarDocumentacion(aplicacion_id,select_documentos);

            const datosAuditoria = {
                mensaje : `Registro de aplicacion ${apl_acronimo}`,
                ip : req.ip,
                usuario_id : req.usuario_id
            }
            generarLogAuditoria(datosAuditoria);

            res.send(`${aplicacion_id}`);
        }
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};

// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarAplicacion = async (req,res) => {
    try {
        const { id } = req.params;
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,usuario_actualizo,
            plataforma,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            
            select_lenguaje, select_base, select_servidor,select_documentos,
            select_funcional, select_tecnico
        } = req.body;
        
        const query = await pool.query(`SELECT aplicacion_id FROM aplicaciones WHERE aplicacion_id = ?`,[id]);
        const app = query[0][0].aplicacion_id; 

        if(app === id){
            console.log('ERROR, ACRONIMO YA OCUPADO');
            return res.status(401).json({ message: 'ACRONIMO YA OCUPADO' });
        }
        else{

            // ============= UPDATE DE LOS DATOS GENERALES =============
            const datos = await pool.query(`
                UPDATE aplicaciones 
                SET 
                    apl_acronimo = ?,apl_nombre = ?,apl_descripcion = ?,
                    apl_estatus = (SELECT estatus_id FROM estatus WHERE estatus = ?),
                    apl_prioridad = (SELECT prioridad_id FROM prioridades WHERE prioridad = ?),
                    apl_critico = ?,apl_direccion = ?,apl_codigo_fuente = ?,
                    apl_alcance = (SELECT alcance_id FROM alcances WHERE alcance = ?),
                    apl_version = ?,apl_cantidad_usuarios = ?,
                    apl_region = (SELECT region_id FROM regiones WHERE region = ?), 
                    apl_fecha_actualizacion = now(), 
                    apl_usuario_actualizo = (SELECT usuario_id FROM usuarios WHERE indicador = ?)
                WHERE aplicaciones.aplicacion_id = ?;`,
                [
                    apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,
                    apl_direccion,apl_codigo_fuente,apl_alcance,apl_version,apl_cantidad_usuarios,
                    apl_region,usuario_actualizo,id
                ]
            );
    
            // ============= UPDATE DE LA PLATAFORMA =============
            if(plataforma){
                const pla = await pool.query(`
                    UPDATE aplicacion_plataforma
                    SET aplicacion_plataforma.plataforma_id = 
                        (SELECT plataforma_id FROM plataformas WHERE plataforma = ?)
                    WHERE aplicacion_plataforma.aplicacion_id = ?;`,
                    [plataforma,id]
                );
            }
    
    
            // ============= UPDATE DE LOS LENGUAJES =============
            // CONDICION QUE VERIFIQUE SI LOS ELEMENTOS NUEVOS SON LOS MISMOS PARA PERMITIR O NO EJECUTAR LA ACTUALIZACION
            await pool.query(`DELETE FROM aplicacion_lenguaje WHERE aplicacion_id = ?;`,[id]);
            for (const element of select_lenguaje) {
                await pool.query(
                    `INSERT INTO aplicacion_lenguaje (aplicacion_id,lenguaje_id) VALUES (?,?)`,
                [id,element.lenguaje_id]); 
            }
    
            await pool.query(`DELETE FROM aplicacion_basedatos WHERE aplicacion_id = ?;`,[id]);
            // ============= UPDATE DE LAS BASES DE DATOS =============
            for (const element of select_base) {
                await pool.query(
                    `INSERT INTO aplicacion_basedatos (aplicacion_id,base_datos_id) VALUES (?,?)`,
                [id,element.base_datos_id]); 
            }
    

            // ============= UPDATE DE LOS SERVIDORES =============
            await pool.query(`DELETE FROM aplicacion_servidor WHERE aplicacion_id = ?;`,[id]);
            for (const element of select_servidor) {
                await pool.query(
                    `INSERT INTO aplicacion_servidor (aplicacion_id,servidor_id) VALUES (?,?)`,
                [id,element.servidor_id]); 
            }

            // ============= UPDATE DE LOS custodioS =============
            if(select_funcional){
                await pool.query(`
                    UPDATE custodios_funcionales
                    SET custodios_funcionales.custodio_id = 
                        (SELECT custodio_id FROM custodios WHERE cus_indicador = ?)
                    WHERE custodios_funcionales.aplicacion_id = ?;`,
                    [select_funcional,id]
                );
            }

            if(select_tecnico){
                await pool.query(`
                    UPDATE custodios_tecnicos
                    SET custodios_tecnicos.custodio_id = 
                        (SELECT custodio_id FROM custodios WHERE cus_indicador = ?)
                    WHERE custodios_tecnicos.aplicacion_id = ?;`,
                    [select_tecnico,id]
                );
            }
    
            // ============= UPDATE DE LOS DATOS GENERALES =============
            await pool.query(`DELETE FROM documentaciones WHERE aplicacion_id = ?;`,[id]);
            for (const element of select_documentos) {
                await pool.query(
                    `INSERT INTO documentaciones (aplicacion_id,doc_descripcion,doc_direccion,doc_tipo)
                    VALUES (?,?,?,(SELECT tipo_id FROM tipos_documentos WHERE tipo = ?));`,
                [id,element.doc_descripcion,element.doc_direccion,element.doc_tipo]);
            }
    
            // ============= UPDATE DE LOS DATOS GENERALES =============
            if(man_frecuencia || man_horas_prom || man_horas_anuales){
                await pool.query(`
                    UPDATE mantenimientos 
                        JOIN aplicaciones ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
                    SET 
                        man_frecuencia = (SELECT frecuencia_id FROM frecuencias WHERE frecuencia = ?),
                        man_horas_prom = ?, man_horas_anuales = ?
                    WHERE aplicaciones.aplicacion_id = ?;`,
                    [man_frecuencia,man_horas_prom,man_horas_anuales,id]
                );
            }

            const datosAuditoria = {
                mensaje : `Actualizacion de aplicacion ${apl_acronimo}`,
                ip : req.ip,
                usuario_id : req.usuario_id
            }
            generarLogAuditoria(datosAuditoria);

            res.json('UPDATE EXITOSO');
        }

    } catch (error) {  
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const data = await pool.query(`
        SELECT 
            aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,
            estatus,apl_direccion,
            DATE_FORMAT (apl_fecha_actualizacion, '%d-%m-%Y %H:%i') as apl_fecha_actualizacion, indicador
        FROM aplicaciones 
            JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
            JOIN usuarios ON aplicaciones.apl_usuario_actualizo = usuarios.usuario_id
        ORDER BY aplicaciones.apl_fecha_actualizacion DESC LIMIT 5;
        `);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER DATOS POR ID ***********************************
const obtenerDato = async (req,res) => {
    try {
        const { id } = req.params;

        const general = await pool.query(`
            SELECT 
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
                estatus,prioridad,apl_critico,alcance,apl_codigo_fuente,
                apl_version,apl_direccion,apl_cantidad_usuarios,region,
                DATE_FORMAT (apl_fecha_actualizacion, '%d-%m-%Y %H:%i') as apl_fecha_actualizacion,
                man_frecuencia, man_horas_prom, man_horas_anuales, 
            FROM aplicaciones
                LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
                LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
                LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
                LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
                LEFT JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
            WHERE aplicaciones.aplicacion_id = ?;`, [id]);

        const plataformas = await pool.query(`
            SELECT plataforma
            FROM aplicaciones
                JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
            WHERE aplicaciones.aplicacion_id = ?`, 
        [id]);

        const lenguajes = await pool.query(` 
            SELECT 
                lenguajes.lenguaje_id, lenguaje
            FROM aplicaciones
                JOIN aplicacion_lenguaje ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                JOIN lenguajes ON aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
        [id]);

        const basedatos = await pool.query(`
            SELECT 
                bases_datos.base_datos_id, base_datos, bas_estatus, 
                tipo, manejador, tipo_ambiente,
                bas_cantidad_usuarios, servidor, bas_fecha_actualizacion, servidores.servidor_id
            FROM aplicaciones
                JOIN aplicacion_basedatos ON aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                JOIN bases_datos ON bases_datos.base_datos_id = aplicacion_basedatos.base_datos_id
                JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.bas_tipo
                JOIN manejadores ON manejadores.manejador_id = bases_datos.bas_manejador
                JOIN tipos_ambientes ON tipos_ambientes.tipo_ambiente_id = bases_datos.bas_tipo_ambiente
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON servidores.servidor_id = basedatos_servidor.servidor_id
            WHERE aplicaciones.aplicacion_id =?;`, [id]);

        const servidores = await pool.query(`
            SELECT 
                servidores.servidor_id,servidor,ser_estatus,ser_direccion,sistema,modelo,marca,
                region,localidad,ser_fecha_actualizacion
            FROM aplicaciones
                    JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
                    JOIN servidores ON aplicacion_servidor.servidor_id = servidores.servidor_id
                    JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
                    JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
                    JOIN marcas ON marcas.marca_id = modelos.mod_marca
                    JOIN regiones ON regiones.region_id = servidores.ser_region_id
                    JOIN localidades ON localidades.localidad_id = servidores.ser_localidad_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);

            const funcional = await pool.query(`
            SELECT 
                cus_nombre, cus_apellido, cus_indicador, cus_cedula, cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                LEFT JOIN custodios_funcionales ON aplicaciones.aplicacion_id = custodios_funcionales.aplicacion_id
                LEFT JOIN custodios ON custodios.custodio_id = custodios_funcionales.custodio_id 
                LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
                LEFT JOIN gerencias ON custodios.cus_gerencia_id = gerencias.gerencia_id 
                LEFT JOIN cargos ON custodios.cus_cargo_id = cargos.cargo_id 
                LEFT JOIN regiones ON custodios.cus_region_id = regiones.region_id 
                LEFT JOIN localidades ON custodios.cus_localidad_id = localidades.localidad_id 
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const tecnico = await pool.query(`
            SELECT 
                cus_nombre, cus_apellido, cus_indicador, cus_cedula, cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                LEFT JOIN custodios_tecnicos ON aplicaciones.aplicacion_id = custodios_tecnicos.aplicacion_id
                LEFT JOIN custodios ON custodios.custodio_id = custodios_tecnicos.custodio_id 
                LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
                LEFT JOIN gerencias ON custodios.cus_gerencia_id = gerencias.gerencia_id 
                LEFT JOIN cargos ON custodios.cus_cargo_id = cargos.cargo_id 
                LEFT JOIN regiones ON custodios.cus_region_id = regiones.region_id 
                LEFT JOIN localidades ON custodios.cus_localidad_id = localidades.localidad_id 
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);

        const documentacion = await pool.query(`
            SELECT 
                doc_descripcion,doc_direccion,doc_tipo,doc_fecha_actualizacion
            FROM aplicaciones
                inner join documentaciones on aplicaciones.aplicacion_id = documentaciones.aplicacion_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]); 
            
        const respuestas = {
            general: general[0],
            plataformas: plataformas[0],
            lenguajes: lenguajes[0],
            basedatos: basedatos[0],
            servidores: servidores[0],
            funcional: funcional[0],
            tecnico: tecnico[0],
            documentacion: documentacion[0],
        }

        res.send(respuestas);


        //res.send(general[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term,estatus,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,pagina,plataforma,cantidad } = req.body;
        const termino = '%' + term + '%';
        const maxCantidad = parseInt(cantidad) + 9;
        let data;
        
        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
        
        if(region){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND region LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,region]);
        }
        else if(plataforma){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND plataforma LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,plataforma]);
        }
        else if(cantidad){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND (apl_cantidad_usuarios > ? AND apl_cantidad_usuarios < ?) 
                    ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,cantidad,maxCantidad]);
        }
        else if(alcance){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND alcance LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,alcance]);
        }
        else if(mantenimiento){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND frecuencia LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,mantenimiento]);
        }
        else if(critico){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND apl_critico LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,critico]);
        }
        else if(codigo){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND apl_codigo_fuente LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,codigo]);
        }
        else if(estatus){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND estatus LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
            [termino,termino,termino,estatus]);
        }
        else if(prioridad){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? )
                    AND prioridad LIKE ? ORDER BY aplicaciones.aplicacion_id ${order}`,
                [termino,termino,termino,prioridad]);
        }
        else{
            data = await pool.query(
                `${query}
                WHERE 
                    (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_acronimo LIKE ? ) ORDER BY aplicaciones.aplicacion_id ${order}`, 
                [termino,termino,termino]);
        }

        res.json(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** ELIMINAR REGISTRO ***********************************
const eliminarAplicacion = async (req,res) => {
    try {
        const { id } = req.params;

        const pla = await pool.query(`DELETE FROM aplicacion_plataforma WHERE aplicacion_id = ?;`, [id]);
        const len = await pool.query(`DELETE FROM aplicacion_lenguaje WHERE aplicacion_id = ?;`, [id]);
        const ser = await pool.query(`DELETE FROM aplicacion_servidor WHERE aplicacion_id = ?;`, [id]);
        const bas = await pool.query(`DELETE FROM aplicacion_basedatos WHERE aplicacion_id = ?;`, [id]);
        const fun = await pool.query(`DELETE FROM custodios_funcionales WHERE aplicacion_id = ?;`, [id]);
        const tec = await pool.query(`DELETE FROM custodios_tecnicos WHERE aplicacion_id = ?;`, [id]);
        const man = await pool.query(`DELETE FROM mantenimientos WHERE aplicacion_id = ?;`, [id]);
        const doc = await pool.query(`DELETE FROM documentaciones WHERE aplicacion_id = ?;`, [id]);
        //const fal = await pool.query(`DELETE FROM fallas WHERE aplicacion_id = ?;`, [id]);
        const app = await pool.query(`DELETE FROM aplicaciones WHERE aplicacion_id = ?;`, [id]);

        const datosAuditoria = {
            mensaje : `Eliminacion de aplicacion ${id}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);


        res.sendStatus(204);
    } catch (error) {
        console.log("ERROR_DELETE_ITEMS");
    }
};



/* 
    ***********************************                             ***********************************
    *********************************** LISTA DE DATOS PARA SELECTS ***********************************
    ***********************************                             ***********************************
*/


// *********************************** LISTA DE PLATAFORMAS PARA SELECTS ***********************************
const obtenerPlataformas = async (req,res) => {
    try{
        const data = await pool.query(`SELECT plataformas FROM plataforma`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
}

// *********************************** LISTA DE LENGUAJES PARA SELECTS ***********************************
const obtenerLenguajes = async (req,res) => {
    try {
        const data = await pool.query(`SELECT lenguaje FROM lenguajes`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE FRAMEWORK PARA SELECTS ***********************************
const obtenerFrameworks = async (req,res) => {
    try {
        const data = await pool.query(`SELECT framework FROM frameworks`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE BASE DE DATOS PARA SELECTS ***********************************
const obtenerBaseDatos = async (req,res) => {
    try {
        const data = await pool.query(`SELECT base_datos FROM bases_datos`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE SERVIDORES PARA SELECTS ***********************************
const obtenerServidores = async (req,res) => {
    try {
        const data = await pool.query(`SELECT servidor FROM servidores`);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** LISTA DE custodioS PARA SELECTS ***********************************
const obtenerCustodios = async (req,res) => {
    try {
        const data = await pool.query(`SELECT cus_indicador FROM custodios`);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};



/* 
    ***********************************                        ***********************************
    *********************************** INFORMACION PARA VISTA ***********************************
    ***********************************                        ***********************************
*/

// *********************************** OBTENER INFORMACION GENERAL ***********************************
const general = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
        SELECT 
            aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,
            estatus,prioridad,apl_critico,alcance,apl_codigo_fuente,
            apl_version,apl_direccion,apl_cantidad_usuarios,region,
            DATE_FORMAT (apl_fecha_actualizacion, '%d-%m-%Y %H:%i') as apl_fecha_actualizacion
        FROM aplicaciones
            LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
            LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
            LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
            LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
        WHERE aplicaciones.aplicacion_id = ?`, [id]);

        const datosAuditoria = {
            mensaje : `Visualizacion de aplicacion ${data[0][0].apl_acronimo}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER TECNOLOGIA ***********************************
const tecno = async (req,res) => {
    try {
        const { id } = req.params;
        let respuestas = {};

        const data = await pool.query(`
            SELECT 
                frecuencia, man_horas_prom, man_horas_anuales
            FROM aplicaciones
                JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
                JOIN frecuencias ON frecuencias.frecuencia_id = mantenimientos.man_frecuencia
            WHERE aplicaciones.aplicacion_id = ?`, 
        [id]);

        const plataformas = await pool.query(`
            SELECT plataforma
            FROM aplicaciones
                JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
            WHERE aplicaciones.aplicacion_id = ?`, 
        [id]);

        const lenguajes = await pool.query(` 
            SELECT 
                lenguajes.lenguaje_id, lenguaje
            FROM aplicaciones
                JOIN aplicacion_lenguaje ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                JOIN lenguajes ON aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
        [id]);

        respuestas = {
            datos: data[0],
            plataformas: plataformas[0],
            lenguajes: lenguajes[0],
        }

        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER BASE DATOS ***********************************
const basedatos = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                bases_datos.base_datos_id, base_datos, estatus, base_cantidad_usuarios, 
                DATE_FORMAT (base_fecha_actualizacion, '%d-%m-%Y %H:%i') as base_fecha_actualizacion, 
                tipo, manejador, ambiente
            FROM aplicaciones
                JOIN aplicacion_basedatos ON aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                JOIN bases_datos ON bases_datos.base_datos_id = aplicacion_basedatos.base_datos_id
                JOIN estatus ON bases_datos.base_estatus = estatus.estatus_id
                JOIN tipos_bases ON tipos_bases.tipo_id = bases_datos.base_tipo
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_manejador
                JOIN ambientes ON ambientes.ambiente_id = bases_datos.base_ambiente
            WHERE aplicaciones.aplicacion_id = ?;`, [id]);

        const respuestas = {
            datos: data[0],
        }
        
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER SERVIDOR ***********************************
const servidor = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                servidores.servidor_id,servidor,ser_estatus,ser_direccion,sistema,modelo,marca,
                region,localidad,ser_fecha_actualizacion
            FROM aplicaciones
                    JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
                    JOIN servidores ON aplicacion_servidor.servidor_id = servidores.servidor_id
                    JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
                    JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
                    JOIN marcas ON marcas.marca_id = modelos.mod_marca
                    JOIN regiones ON regiones.region_id = servidores.ser_region_id
                    JOIN localidades ON localidades.localidad_id = servidores.ser_localidad_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const respuestas = {
            datos: data[0]
        }
                
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER CUSTODIO ***********************************
const custodio = async (req,res) => {
    try {
        const { id } = req.params;

        const funcional = await pool.query(`
            SELECT 
                cus_nombre, cus_apellido, cus_indicador, cus_cedula, cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                LEFT JOIN custodios_funcionales ON aplicaciones.aplicacion_id = custodios_funcionales.aplicacion_id
                LEFT JOIN custodios ON custodios.custodio_id = custodios_funcionales.custodio_id 
                LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
                LEFT JOIN gerencias ON custodios.cus_gerencia = gerencias.gerencia_id 
                LEFT JOIN cargos ON custodios.cus_cargo = cargos.cargo_id 
                LEFT JOIN regiones ON custodios.cus_region = regiones.region_id 
                LEFT JOIN localidades ON custodios.cus_localidad = localidades.localidad_id 
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const tecnico = await pool.query(`
            SELECT 
                cus_nombre, cus_apellido, cus_indicador, cus_cedula, cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                LEFT JOIN custodios_tecnicos ON aplicaciones.aplicacion_id = custodios_tecnicos.aplicacion_id
                LEFT JOIN custodios ON custodios.custodio_id = custodios_tecnicos.custodio_id 
                LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
                LEFT JOIN gerencias ON custodios.cus_gerencia = gerencias.gerencia_id 
                LEFT JOIN cargos ON custodios.cus_cargo = cargos.cargo_id 
                LEFT JOIN regiones ON custodios.cus_region = regiones.region_id 
                LEFT JOIN localidades ON custodios.cus_localidad = localidades.localidad_id 
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const respuestas = {
            funcional: funcional[0],
            tecnico: tecnico[0],
        }
                
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER DOCUMENTACION ***********************************
const documentacion = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                doc_descripcion,doc_direccion,tipo as doc_tipo,doc_fecha_actualizacion
            FROM aplicaciones
                inner join documentaciones on aplicaciones.aplicacion_id = documentaciones.aplicacion_id
                inner join tipos_documentos on documentaciones.doc_tipo = tipos_documentos.tipo_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]); 
            
        const respuestas = {
            datos: data[0],
        }
                
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};




module.exports = { 
    obtenerDatos, 
    obtenerDato, 
    registrarAplicacion, 
    actualizarAplicacion, 
    eliminarAplicacion,
    obtenerBusqueda,
    obtenerLenguajes,
    obtenerFrameworks,
    obtenerBaseDatos,
    obtenerServidores,
    obtenerCustodios,
    obtenerPlataformas,
    general,tecno,basedatos,
    servidor,custodio,
    documentacion,
};