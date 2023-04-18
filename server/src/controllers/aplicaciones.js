
const pool = require('../config');

const { verificarAplicacion, verificarPlataforma, 
        verificarLenguaje, verificarFramework, verificarServidor, 
        verificarBase, verificarMantenimiento, verificarDocumentacion, verificarResponsable } = require('../helpers/verificaciones');
const { selectSimple } = require('../helpers/consultas');


const query = `
SELECT 
    aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_version,
    apl_alcance,apl_estatus,apl_prioridad,apl_direccion,region,plataforma,
    apl_codigo_fuente,apl_critico,man_frecuencia
FROM aplicaciones
    JOIN regiones ON aplicaciones.apl_region = regiones.region_id
    JOIN aplicacion_plataforma ON aplicaciones.aplicacion_id = aplicacion_plataforma.aplicacion_id
    JOIN plataformas ON aplicacion_plataforma.plataforma_id = plataformas.plataforma_id
    JOIN mantenimientos ON aplicaciones.aplicacion_id = mantenimientos.aplicacion_id
`;


/* 
    ***********************************               ***********************************
    *********************************** OBTENER DATOS ***********************************
    ***********************************               ***********************************
*/

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const data = await pool.query(selectSimple);
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
        const { term,estatus,plataforma,prioridad,region,alcance,mantenimiento,
                critico,codigo,count,order,pagina } = req.body;
        const termino = '%' + term + '%';
        const offset = (pagina-1)*10;
        let data;

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
        
        if(region){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    plataforma LIKE ?)
                    AND region LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,region,parseInt(count),offset]);
        }
        else if(alcance){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    plataforma LIKE ?)
                    AND apl_alcance LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,alcance,parseInt(count),offset]);
        }
        else if(mantenimiento){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    plataforma LIKE ?)
                    AND man_frecuencia LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,mantenimiento,parseInt(count),offset]);
        }
        else if(critico){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_critico LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,critico,parseInt(count),offset]);
        }
        else if(codigo){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_estatus LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR
                    plataforma LIKE ?)
                    AND apl_codigo_fuente LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,codigo,parseInt(count),offset]);
        }
        else if(estatus){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR
                    apl_prioridad LIKE ? OR
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_estatus LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?;`, 
            [termino,termino,termino,termino,termino,termino,termino,termino,
            termino,termino,estatus,parseInt(count),offset]);
        }
        else if(prioridad){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR 
                    plataforma LIKE ?)
                    AND apl_prioridad LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,
                termino,termino,prioridad,parseInt(count),offset]);
        }
        else if(plataforma){
            data = await pool.query(
                `${query}
                WHERE (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_prioridad LIKE ? OR 
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? )
                    AND plataforma LIKE ? ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?`,
                [termino,termino,termino,termino,termino,termino,termino,termino,
                termino,termino,plataforma,parseInt(count),offset]);
        }
        else{
            data = await pool.query(
                `${query}
                WHERE 
                    (aplicaciones.aplicacion_id LIKE ? OR 
                    apl_nombre LIKE ? OR 
                    apl_acronimo LIKE ? OR 
                    apl_estatus LIKE ? OR 
                    apl_prioridad LIKE ? OR 
                    apl_alcance LIKE ? OR 
                    apl_critico LIKE ? OR 
                    apl_codigo_fuente LIKE ? OR 
                    man_frecuencia LIKE ? OR 
                    region LIKE ? OR 
                    plataforma LIKE ? ) ORDER BY aplicaciones.aplicacion_id ${order} LIMIT ? OFFSET ?`, 
                [termino,termino,termino,termino,termino,termino,termino,
                termino,termino,termino,termino,parseInt(count),offset]);
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
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
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
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
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
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
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
                ORDER BY aplicaciones.aplicacion_id ASC LIMIT 10 OFFSET ?;`, 
                [termino,termino,termino,termino,offset]
            );
        }
        else{
            data = await pool.query(
                `SELECT aplicaciones.aplicacion_id, apl_acronimo, apl_nombre, ${campo}
                FROM aplicaciones 
                WHERE ${campo} LIKE ? OR
                aplicaciones.aplicacion_id LIKE ? OR apl_nombre LIKE ? OR apl_acronimo LIKE ? LIMIT 3 OFFSET ?;`, 
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
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje,lenguaje2,lenguaje3, framework,framework2,framework3, 
            select_base, select_servidor,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,

            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_region,tecnico_localidad,
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
            const aplicacion_id = await verificarAplicacion(
                apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
                apl_codigo_fuente,apl_version,apl_direccion,apl_cantidad_usuarios,apl_region,apl_fecha_registro
            );

            await verificarPlataforma(aplicacion_id, plataforma);          
            await verificarLenguaje(aplicacion_id, lenguaje, lenguaje2, lenguaje3);          
            await verificarFramework(aplicacion_id, framework, framework2, framework3);

            await verificarServidor(aplicacion_id,select_servidor);
            await verificarBase(aplicacion_id,select_base);

            await verificarResponsable('funcional',aplicacion_id,funcional_nombre,funcional_apellido,
                funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
                funcional_gerencia,funcional_region,funcional_localidad);    
            await verificarResponsable('tecnico',aplicacion_id,tecnico_nombre,tecnico_apellido,
                tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
                tecnico_gerencia,tecnico_region,tecnico_localidad); 

            await verificarMantenimiento(aplicacion_id,man_frecuencia,man_horas_prom,man_horas_anuales);          
            await verificarDocumentacion(aplicacion_id,doc_descripcion,doc_direccion,doc_tipo);

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
                    (SELECT plataforma_id FROM plataformas WHERE plataforma = ?)
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
                    (SELECT lenguaje_id FROM lenguajes WHERE lenguaje = ?)
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
                    (SELECT framework_id FROM frameworks WHERE framework = ?)
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
                    apl_region_id = (SELECT region_id FROM regiones WHERE region = ?)
                WHERE aplicaciones.aplicacion_id = ?;`, 
                [valor,id]
            );
        } 
        else {
            data = await pool.query(
                `UPDATE aplicaciones 
                SET 
                    ${campo} = ?
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
            aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,
            apl_prioridad,apl_critico,apl_alcance,apl_codigo_fuente,
            apl_version,apl_direccion,apl_cantidad_usuarios,region,apl_fecha_registro
        FROM aplicaciones
            JOIN regiones ON aplicaciones.apl_region = regiones.region_id
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
                lenguaje, version_lenguaje, framework
            FROM aplicaciones
                JOIN aplicacion_lenguaje ON aplicaciones.aplicacion_id = aplicacion_lenguaje.aplicacion_id
                JOIN lenguajes ON aplicacion_lenguaje.lenguaje_id = lenguajes.lenguaje_id
                JOIN versiones_lenguajes ON versiones_lenguajes.version_lenguaje_id = lenguajes.lenguaje_id
                JOIN aplicacion_framework ON aplicaciones.aplicacion_id = aplicacion_framework.aplicacion_id
                JOIN frameworks ON aplicacion_framework.framework_id = frameworks.framework_id
            WHERE aplicaciones.aplicacion_id = ?`, 
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
                base_datos,bas_estatus,tipo,
                manejador,version_manejador,bas_cantidad_usuarios,
                bas_tipo_ambiente,servidor
            FROM aplicaciones
                JOIN aplicacion_basedatos ON aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                JOIN bases_datos ON bases_datos.base_datos_id = aplicacion_basedatos.base_datos_id
                JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
                JOIN versiones_manejadores ON manejadores.manejador_id = versiones_manejadores.manejador_id
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON servidores.servidor_id = basedatos_servidor.servidor_id
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

// *********************************** OBTENER SERVIDOR ***********************************
const servidor = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                servidor,ser_direccion,ser_estatus,sistema,sistema_version,region, localidad
            FROM aplicaciones
                JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
                JOIN servidores ON aplicacion_servidor.servidor_id = servidores.servidor_id
                JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
                JOIN regiones ON servidores.ser_region_id = regiones.region_id
                JOIN localidades ON servidores.ser_localidad_id = localidades.localidad_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);

        const modelos = await pool.query(`
            SELECT 
                modelo,mod_marca,mod_serial,
                mod_velocidad_cpu,mod_cantidad_cpu, mod_memoria
            FROM aplicaciones
                JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
                JOIN servidores ON aplicacion_servidor.servidor_id = servidores.servidor_id
                JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const respuestas = {
            datos: data[0],
            modelos: modelos[0],
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
		        res_nombre, res_apellido, res_indicador, res_cedula, res_cargo, 
                telefono, gerencia, region, localidad
            FROM aplicaciones
                JOIN responsables_funcionales ON aplicaciones.aplicacion_id = responsables_funcionales.aplicacion_id
                JOIN responsables ON responsables.responsable_id = responsables_funcionales.responsable_id 
                JOIN telefonos ON responsables.responsable_id = telefonos.telefono_id 
                JOIN gerencias ON responsables.res_gerencia_id = gerencias.gerencia_id 
                JOIN regiones ON responsables.res_region_id = regiones.region_id 
                JOIN localidades ON responsables.res_localidad_id = localidades.localidad_id 
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]);
            
        const tecnico = await pool.query(`
            SELECT 
		        res_nombre, res_apellido, res_indicador, res_cedula, res_cargo,
                telefono, gerencia, region, localidad
            FROM aplicaciones
                JOIN responsables_tecnicos ON aplicaciones.aplicacion_id = responsables_tecnicos.aplicacion_id
                JOIN responsables ON responsables.responsable_id = responsables_tecnicos.responsable_id 
                JOIN telefonos ON responsables.responsable_id = telefonos.telefono_id 
                JOIN gerencias ON responsables.res_gerencia_id = gerencias.gerencia_id 
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

// *********************************** OBTENER FALLAS ***********************************
const fallas = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                falla_id,fal_clase,fal_descripcion,fal_solucion,fal_impacto
            FROM aplicaciones
                JOIN fallas on aplicaciones.aplicacion_id = fallas.aplicacion_id
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

// *********************************** OBTENER FALLAS ***********************************
const registrarFalla = async (req,res) => {
    try {
        
        const { aplicacion,clase,impacto,descripcion,solucion } = req.body;

        const data = await pool.query(`
            INSERT INTO fallas
                (aplicacion_id,fal_numero,fal_clase,fal_descripcion,fal_solucion,fal_impacto)
            VALUES
                (?,?,?,?,?,?);`, 
            [aplicacion,10,clase,descripcion,solucion,impacto]); 
                
        console.log('FALLA REGISTRADA CORRECTAMENTE');
        res.send('FALLA REGISTRADA CORRECTAMENTE');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER FALLAS ***********************************
const buscarFalla = async (req,res) => {
    const { term } = req.body;
    const termino = `%${term}%`;

    if (term === undefined || null)
        return res.status(404).json({ message: "Error al recibir consulta" });

    try{
        const data = await pool.query(`
            SELECT falla_id, fal_clase, fal_impacto, fal_descripcion, fal_solucion, aplicaciones.aplicacion_id
            FROM fallas 
                JOIN aplicaciones ON aplicaciones.aplicacion_id = fallas.aplicacion_id
            WHERE 
                aplicaciones.aplicacion_id LIKE ? OR
                falla_id LIKE ? OR 
                fal_clase = ? OR 
                fal_impacto LIKE ? OR 
                fal_descripcion LIKE ? OR 
                fal_solucion LIKE ?
            ORDER BY falla_id ASC;`,
            [termino,termino,termino,termino,termino,termino]
        );
        res.send(data[0]);

    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
};


// *************** CAMBIAR PERMISOS ***************
const actualizarFalla = async (req,res) => {
    const { id } = req.params;
    const { clase, impacto, descripcion, solucion } = req.body;
   
    try {
        const query = await pool.query(`
        UPDATE 
            fallas 
        SET 
            fal_clase = ?, 
            fal_impacto = ?,
            fal_descripcion = ?, 
            fal_solucion = ?
        WHERE falla_id = ?`, [clase, impacto, descripcion, solucion, id]
        );
        
        res.send('ACTUALIZACION EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }


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
    obtenerCantidadTotal,
    general,tecno,basedatos,
    servidor,responsable,
    documentacion,fallas,
    registrarFalla,buscarFalla,
    actualizarFalla,
 };