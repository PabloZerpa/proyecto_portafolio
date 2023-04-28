
const pool = require('../config');

const { insertarAplicacion, insertarPlataforma, insertarLenguaje, insertarFramework, 
        insertarMantenimiento, insertarDocumentacion, insertarServidor, insertarBase, insertarResponsable } = require('../helpers/verificaciones');
const { selectSimple } = require('../helpers/consultas');
const query = `
SELECT 
    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_version,
    alcance,estatus,prioridad,apl_direccion,region,
    apl_codigo_fuente,apl_critico,man_frecuencia
FROM aplicaciones
    LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
    LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
    LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
    LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
    LEFT JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
`;


/* 
    ***********************************               ***********************************
    *********************************** OBTENER DATOS ***********************************
    ***********************************               ***********************************
*/

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
            ORDER BY apl_fecha_actualizacion DESC LIMIT 5;
        `);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER DATOS POR ID ***********************************
const obtenerDato = async (req,res) => {
};

// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term,estatus,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,pagina } = req.body;
        const termino = '%' + term + '%';
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
                    AND man_frecuencia LIKE ? ORDER BY aplicaciones.aplicacion_id ${order};`, 
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

// *********************************** OBTENER LOS DATOS POR CAMPO ESPECIFICO ***********************************
const obtenerCampo = async (req,res) => {
    try { 
        const { term, campo, pagina } = req.body;
        const termino = '%' + term + '%';
        const offset = (pagina-1)*3;
        let data = null;

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
            
        if(campo === 'Plataforma'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas ON plataformas.plataforma_id = aplicacion_plataforma.plataforma_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 20;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else if(campo === 'Lenguaje'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN aplicacion_lenguaje ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                JOIN lenguajes ON lenguajes.lenguaje_id = aplicacion_lenguaje.lenguaje_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 20;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else if(campo === 'Framework'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN aplicacion_framework ON aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                JOIN frameworks ON frameworks.framework_id = aplicacion_framework.framework_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 20;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else if(campo === 'Region'){
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                JOIN regiones ON aplicaciones.aplicacion_id = regiones.region_id
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? 
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 20;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else{
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? LIMIT 20;`, 
                [termino,termino,termino,termino,offset]
            );
        }

        if (data.affectedRows === 0)
            return res.status(404).json({ message: "Sin coincidencias" });

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER CANTIDAD TOTAL ***********************************
const obtenerCantidadTotal = async (req,res) => {
    try {
        const data = await pool.query(`
            SELECT 
                COUNT(*)
            FROM aplicaciones
                JOIN aplicacion_plataforma
                ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas
                ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
                inner join aplicacion_lenguaje
                on aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                inner join lenguajes
                on aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                inner join aplicacion_basedatos
                on aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                inner join bases_datos
                on aplicacion_basedatos.base_datos_id = bases_datos.base_datos_id
                join servidores
                on aplicaciones.aplicacion_id = servidores.servidor_id
                inner join regiones
                on aplicaciones.aplicacion_id = regiones.region_id
                inner join responsables_funcionales
                on aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
                inner join responsables
                on responsables.responsable_id = responsables_funcionales.responsable_id
            `);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};



/* 
    ***********************************                      ***********************************
    *********************************** CREATE-UPDATE-DELETE ***********************************
    ***********************************                      ***********************************
*/

// *********************************** CREAR REGISTRO ***********************************
const crearAplicacion = async (req,res) => {
    try {
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,apl_usuario_registro,
            plataforma,lenguaje1,lenguaje2,lenguaje3,  
            version1, version2, version3,
            framework1,framework2,framework3, 
            select_lenguaje, select_base, select_servidor,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion,
 
            select_funcional, select_tecnico,
            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_region,tecnico_localidad,
        } = req.body;

        console.log(apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,apl_usuario_registro,
            plataforma,lenguaje1,lenguaje2,lenguaje3, 
            version1, version2, version3,
            framework1,framework2,framework3, 
            select_lenguaje, select_base, select_servidor,
            man_frecuencia, man_horas_prom,man_horas_anuales, 
            doc_descripcion, doc_tipo, doc_direccion,
 
            select_funcional, select_tecnico,
            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_region,tecnico_localidad);
        

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

            if(!select_lenguaje[0])
                return res.status(401).json({ message: 'ERROR, NINGUN LENGUAJE SELECCIONADO' });
            if(!select_servidor[0])
                return res.status(401).json({ message: 'ERROR, SERVIDOR SIN SELECCIONAR' });
            if(!select_base[0])
                return res.status(401).json({ message: 'ERROR, BASE DE DATOS SIN SELECCIONAR' });

            const aplicacion_id = await insertarAplicacion(
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                apl_codigo_fuente,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region,
                apl_usuario_registro
            );

            await insertarPlataforma(aplicacion_id, plataforma);
            
            await insertarLenguaje(aplicacion_id, select_lenguaje);    
            
            if(framework1 || framework2 || framework3)
                await insertarFramework(aplicacion_id, framework1, framework2, framework3);

            await insertarServidor(aplicacion_id,select_servidor);
            await insertarBase(aplicacion_id,select_base);

            await insertarResponsable('funcional',aplicacion_id,select_funcional,funcional_nombre,funcional_apellido,
                funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
                funcional_gerencia,funcional_region,funcional_localidad);
                
            await insertarResponsable('tecnico',aplicacion_id,select_tecnico,tecnico_nombre,tecnico_apellido,
                tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
                tecnico_gerencia,tecnico_region,tecnico_localidad);

            await insertarMantenimiento(aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales);          
            await insertarDocumentacion(aplicacion_id,doc_descripcion,doc_direccion,doc_tipo);

            console.log('CREACION EXITOSA');
            res.send('CREACION EXITOSA');
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
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,
            apl_cantidad_usuarios,apl_critico,apl_direccion,apl_codigo_fuente,apl_alcance,
            apl_region,apl_fecha_registro,plataforma,lenguaje,framework,indicador_funcional,indicador_tecnico,
            select_servidor,select_base,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales
        } = req.body;

        const datos = await pool.query(`
            UPDATE aplicaciones 
                JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
                JOIN documentaciones ON mantenimientos.aplicacion_id = aplicaciones.aplicacion_id
                JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                JOIN plataformas ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
            SET 
                apl_acronimo = ?,apl_nombre = ?,apl_descripcion = ?,apl_estatus = ?,
                apl_prioridad = ?,apl_critico = ?,apl_direccion = ?,apl_codigo_fuente = ?,
                apl_alcance = ?,apl_version = ?,apl_cantidad_usuarios = ?,
                apl_region = (SELECT region_id FROM regiones WHERE region = ?),
                man_frecuencia = ?, man_horas_prom = ?, man_horas_anuales = ?,
                doc_descripcion = ?, doc_direccion = ?, doc_tipo = ?
            WHERE aplicaciones.aplicacion_id = ?;`,
            [
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,
                apl_direccion,apl_codigo_fuente,apl_alcance,apl_version,apl_cantidad_usuarios,
                apl_region,man_frecuencia,man_horas_prom,man_horas_anuales,doc_descripcion,
                doc_direccion,doc_tipo,id
            ]
        );
        console.log('GENERAL ACTUALIZADO');

        const pla = await pool.query(`
            UPDATE aplicacion_plataforma
            SET aplicacion_plataforma.plataforma_id = (SELECT plataforma_id FROM plataformas WHERE plataforma = ?)
            WHERE aplicacion_plataforma.aplicacion_id = ?;`,
            [plataforma,id]
        );
        console.log('PLATAFORMA ACTUALIZADO');

        const len = await pool.query(`
            UPDATE aplicacion_lenguaje
            SET aplicacion_lenguaje.lenguaje_id = (SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?)
            WHERE aplicacion_lenguaje.aplicacion_id = ? AND aplicacion_lenguaje.lenguaje_id = 5;`,
            [lenguaje,id]
        );
        console.log('LENGUAJE ACTUALIZADO');

        const fra = await pool.query(`
            UPDATE aplicacion_framework
            SET aplicacion_framework.framework_id = (SELECT framework_id FROM frameworks WHERE framework = ?)
            WHERE aplicacion_framework.aplicacion_id = ? AND aplicacion_framework.framework_id = 8;`,
            [framework,id]
        );
        console.log('FRAMEWORK ACTUALIZADO');

        const bas = await pool.query(`
            UPDATE aplicacion_basedatos
            SET aplicacion_basedatos.base_datos_id = (SELECT base_datos_id FROM bases_datos WHERE base_datos = ?)
            WHERE aplicacion_basedatos.aplicacion_id = ?;`,
            [select_base,id]
        );
        console.log('BASE DE DATOS ACTUALIZADO');

        const ser = await pool.query(`
            UPDATE aplicacion_servidor
            SET aplicacion_servidor.servidor_id = (SELECT servidor_id FROM servidores WHERE servidor = ?)
            WHERE aplicacion_servidor.aplicacion_id = ?;`,
            [select_servidor,id]
        );
        console.log('SERVIDOR ACTUALIZADO');

        const fun = await pool.query(`
            UPDATE responsables_funcionales
            SET responsables_funcionales.responsable_id = 
                (SELECT responsable_id FROM responsables WHERE res_indicador = ?)
            WHERE responsables_funcionales.aplicacion_id = ?;`,
            [indicador_funcional,id]
        );
        console.log('RESPONSABLE FUNCIONAL ACTUALIZADO');

        const tec = await pool.query(`
            UPDATE responsables_tecnicos
            SET responsables_tecnicos.responsable_id = 
                (SELECT responsable_id FROM responsables WHERE res_indicador = ?)
            WHERE responsables_tecnicos.aplicacion_id = ?;`,
            [indicador_tecnico,id]
        );
        console.log('RESPONSABLE TECNICO ACTUALIZADO');

        console.log('ACTUALIZACION EXITOSA');
        res.json('UPDATE EXITOSO');

    } catch (error) {  
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};

// *********************************** ACTUALIZAR POR CAMPO ESPECIFICO ***********************************
const actualizarCampo = async (req,res) => {
    try {
        const { id } = req.params;
        const { campo, valor } = req.body;
        let data = null;

        if (campo === 'Plataforma') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN aplicacion_plataforma
                ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
                SET 
                    aplicacion_plataforma.plataforma_id = 
                    (SELECT plataforma_id FROM plataformas WHERE plataforma = ?),
                    apl_fecha_actualizacion = now()
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else if (campo === 'Lenguaje') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN aplicacion_lenguaje
                ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                SET 
                    aplicacion_lenguaje.lenguaje_id = 
                    (SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?),
                    apl_fecha_actualizacion = now()
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else if (campo === 'Framework') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN aplicacion_framework
                ON aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                SET 
                    aplicacion_framework.framework_id = 
                    (SELECT framework_id FROM frameworks WHERE framework = ?),
                    apl_fecha_actualizacion = now()
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else if (campo === 'Region') {
            data = await pool.query(
                `UPDATE aplicaciones
                JOIN regiones
                ON aplicaciones.aplicacion_id = regiones.region_id
                SET 
                    apl_region_id = (SELECT region_id FROM regiones WHERE region = ?),
                    apl_fecha_actualizacion = now()
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else {
            data = await pool.query(
                `UPDATE aplicaciones 
                SET 
                    ${campo} = ?,
                    apl_fecha_actualizacion = now()
                WHERE aplicacion_id = ?`, 
                [valor,id]
            );
        }

        if (data[0].affectedRows === 0)
            return res.status(404).json({ message: "Name not found" });
            
        const [rows] = await pool.query("SELECT * FROM aplicaciones WHERE aplicacion_id = ?", [id]);
        res.json(rows[0]);

    } catch (error) {
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};

// *********************************** ELIMINAR REGISTRO ***********************************
const eliminarAplicacion = async (req,res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query('DELETE FROM aplicaciones WHERE aplicacion_id = ?', [id]);
        res.sendStatus(204);
    } catch (error) {
        console.log("ERROR_DELETE_ITEMS");
    }
};

// *********************************** OBTENER DATOS PARA GENERAR GRAFICOS ***********************************
const obtenerPorGraficos = async (req,res) => {
    try { 
        const opcionRegion = ['CARABOBO NORTE', 'CENTRO', 'CENTRO SUR', 'CORPORATIVO','ORIENTE NORTE', 
        'ORIENTE SUR', 'OCCIDENTE','ANDES',''];
        const { categoria, orden } = req.body;
        let regiones = '';
        //let cantidad = {orienteNorte: ''};
        let cantidad = [];

        console.log(categoria,orden);
 
        if (categoria === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
         
        const query = await pool.query( `SELECT ${categoria} FROM apps`);
        regiones = query[0]; 
        console.log(regiones);
        console.log(regiones.length);

        //          (POSICION_ARREGLO/CANTIDAD_TOTAL)*100
        // console.log(regiones[5].region);
        // const data = await pool.query( `SELECT ${categoria} FROM apps WHERE region = ?`, [regiones[5].region]);
        // console.log(data[0]);
        // console.log(data[0].length);
        // cantidad.orienteNorte = data[0].length
        // //cantidad.push(data[0].length)
        // console.log(cantidad);

        for(let i=0; i < opcionRegion.length; i++){
            console.log(opcionRegion[i]);

            const data = await pool.query( `SELECT ${categoria} FROM apps WHERE region = ?`, [opcionRegion[i]]);

            console.log(data[0]);
            console.log(data[0].length);
            cantidad.push(data[0].length)
            console.log(cantidad); 
        }

        // if (data.affectedRows === 0)
        //     return res.status(404).json({ message: "Sin coincidencias" });

        // res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
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
        console.log('AQUI');
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
        console.log(data[0]);
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

// *********************************** LISTA DE RESPONSABLES PARA SELECTS ***********************************
const obtenerResponsables = async (req,res) => {
    try {
        const data = await pool.query(`SELECT res_indicador FROM responsables`);
        res.send(data[0]);
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
            LEFT JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
        WHERE aplicaciones.aplicacion_id = ?`, [id]);

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
                man_frecuencia, man_horas_prom, man_horas_anuales
            FROM aplicaciones
                JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
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
                lenguaje, framework
            FROM aplicaciones
                JOIN aplicacion_lenguaje ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                JOIN lenguajes ON aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                JOIN aplicacion_framework ON aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                JOIN frameworks ON aplicacion_framework.framework_id = frameworks.framework_id
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

        // const modelos = await pool.query(`
        //     SELECT 
        //         modelo,mod_marca,mod_serial,
        //         mod_velocidad_cpu,mod_cantidad_cpu, mod_memoria
        //     FROM aplicaciones
        //         JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
        //         JOIN servidores ON aplicacion_servidor.servidor_id = servidores.servidor_id
        //         JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
        //     WHERE aplicaciones.aplicacion_id = ?;`, 
        //     [id]);
            
        const respuestas = {
            datos: data[0],
            //modelos: modelos[0],
        }
                
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER RESPONSABLE ***********************************
const responsable = async (req,res) => {
    try {
        const { id } = req.params;

        const funcional = await pool.query(`
            SELECT 
                res_nombre, res_apellido, res_indicador, res_cedula, cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                JOIN responsables_funcionales ON aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
                JOIN responsables ON responsables.responsable_id = responsables_funcionales.responsable_id 
                JOIN telefonos ON responsables.responsable_id = telefonos.telefono_id 
                JOIN gerencias ON responsables.res_gerencia_id = gerencias.gerencia_id 
                JOIN cargos ON responsables.res_cargo_id = cargos.cargo_id 
                JOIN regiones ON responsables.res_region_id = regiones.region_id 
                JOIN localidades ON responsables.res_localidad_id = localidades.localidad_id 
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const tecnico = await pool.query(`
            SELECT 
                res_nombre, res_apellido, res_indicador, res_cedula, cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                JOIN responsables_tecnicos ON aplicaciones.aplicacion_id = responsables_tecnicos.aplicacion_id
                JOIN responsables ON responsables.responsable_id = responsables_tecnicos.responsable_id 
                JOIN telefonos ON responsables.responsable_id = telefonos.telefono_id 
                JOIN gerencias ON responsables.res_gerencia_id = gerencias.gerencia_id 
                JOIN cargos ON responsables.res_cargo_id = cargos.cargo_id 
                JOIN regiones ON responsables.res_region_id = regiones.region_id 
                JOIN localidades ON responsables.res_localidad_id = localidades.localidad_id 
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
                doc_descripcion,doc_direccion,doc_tipo,doc_fecha_actualizacion
            FROM aplicaciones
                inner join documentaciones on aplicaciones.aplicacion_id = documentaciones.aplicacion_id
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
    crearAplicacion, 
    actualizarAplicacion, 
    eliminarAplicacion,
    obtenerBusqueda,
    obtenerCampo,
    obtenerPorGraficos,
    actualizarCampo,
    obtenerLenguajes,
    obtenerFrameworks,
    obtenerBaseDatos,
    obtenerServidores,
    obtenerResponsables,
    obtenerPlataformas,
    obtenerCantidadTotal,
    general,tecno,basedatos,
    servidor,responsable,
    documentacion,
 };