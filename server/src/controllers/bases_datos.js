const pool = require('../config');

const query = `SELECT
bases_datos.base_datos_id,base_datos,bas_estatus,tipo,manejador,version_manejador,
bas_cantidad_usuarios,bas_tipo_ambiente
FROM bases_datos
JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
JOIN versiones_manejadores ON manejadores.manejador_id = versiones_manejadores.manejador_id`

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const data = await pool.query(`
            SELECT
                bases_datos.base_datos_id,base_datos,bas_estatus,tipo,manejador,version_manejador,
		        bas_cantidad_usuarios,bas_tipo_ambiente, servidor, region, localidad
            FROM bases_datos
                JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
                JOIN versiones_manejadores ON manejadores.manejador_id = versiones_manejadores.manejador_id
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON servidores.servidor_id = basedatos_servidor.servidor_id
                JOIN regiones ON servidores.ser_region_id = regiones.region_id
                JOIN localidades ON regiones.region_id = localidades.localidad_id
            ORDER BY bases_datos.base_datos_id ASC;
        `);
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerBaseDatos = async (req,res) => {
    try {
        const {id} = req.params;

        const data = await pool.query(`
            SELECT
                bases_datos.base_datos_id,base_datos,bas_estatus,tipo,manejador,version_manejador,
		        bas_cantidad_usuarios,bas_tipo_ambiente
            FROM bases_datos
                JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
                JOIN versiones_manejadores ON manejadores.manejador_id = versiones_manejadores.manejador_id
            WHERE bases_datos.base_datos_id = ?;`, [id]);

        console.log(data[0][0]);
        res.send(data[0][0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term,count,orden,region } = req.body;
        const termino = '%' + term + '%';
        let data;

        if (term === undefined || null)
        return res.status(404).json({ message: "Error al recibir consulta" });
    
        data = await pool.query(`
            ${query}
            WHERE 
                (bases_datos.base_datos_id LIKE ? OR 
                base_datos LIKE ? OR 
                bas_cantidad_usuarios LIKE ? OR 
                bas_estatus LIKE ? OR 
                bas_tipo_ambiente LIKE ? OR 
                tipo LIKE ? OR 
                manejador LIKE ? ) ORDER BY bases_datos.base_datos_id ${orden} LIMIT 10`, 
            [termino,termino,termino,termino,termino,termino,termino,parseInt(count)]);

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

 
// *********************************** CREAR REGISTRO ***********************************
const crearBaseDatos = async (req,res) => {
    try {
        const {
            select_aplicacion, select_servidor,
            base_datos,estatus,cantidad_usuarios, tipo, manejador, manejador_version,
            tipo_ambiente
        } = req.body;

        const query = await pool.query(
            `SELECT * FROM bases_datos WHERE base_datos = ?`, [base_datos]);
        const bd = query[0][0];

        // ****************************** VERIFICA QUE LA APLICACION NO EXISTA ******************************
        if(bd){
            console.log('ERROR, BASE DE DATOS YA EXISTE');
            return res.status(401).json({ message: 'ERROR, APLICACION YA EXISTE' });
        }
        else{

            // crea los datos del manejador de la bd
            let manejador_id;
            const datos_manejador = await pool.query(
                `INSERT INTO manejadores (manejador) VALUES (?)`, 
                [manejador]
            );
            const selectMan = await pool.query(`SELECT * FROM manejadores ORDER BY manejador_id DESC LIMIT 1`);
            manejador_id = selectMan[0][0].manejador_id;
            console.log('MANEJADOR REGISTRADO: ' + manejador_id);
            
            // crea los datos del tipo de bd
            let tipo_base_id;
            const datos_tipoBases = await pool.query(
                `INSERT INTO tipos_bases (tipo) VALUES (?)`, 
                [tipo]
            );
            const selectTipo = await pool.query(`SELECT * FROM tipos_bases ORDER BY tipo_base_id DESC LIMIT 1`);
            tipo_base_id = selectTipo[0][0].tipo_base_id;
            console.log('TIPO DE BD REGISTRADO: ' + tipo_base_id);
            
            // crea los datos de la base de datos
            const datos_basedatos = await pool.query(
                `INSERT INTO bases_datos (base_datos,bas_estatus,bas_tipo,bas_manejador,
                    bas_tipo_ambiente,bas_cantidad_usuarios) 
                VALUES (?,?,?,?,?,?);`, 
                [base_datos,estatus,tipo_base_id,manejador_id,tipo_ambiente,cantidad_usuarios]
            );

            console.log('CREACION EXITOSA');
            res.send('CREACION EXITOSA');
        }
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};


// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarBaseDatos = async (req,res) => {
    try {
        console.log('EN EN UPDATE DEL SERVER');
        const { id } = req.params;

        const {
            select_aplicacion, select_servidor,
            base_datos,estatus,cantidad_usuarios, tipo, manejador, manejador_version,
            tipo_ambiente
        } = req.body;

        console.log(
            select_aplicacion, select_servidor,
            base_datos,estatus,cantidad_usuarios, tipo, manejador, manejador_version,
            tipo_ambiente
        );

        // ACTUALIZAR LA BASE DE DATOS
        const [result] = await pool.query(
            `UPDATE bases_datos  SET 
                base_datos = ?,bas_estatus = ?,bas_cantidad_usuarios = ?,
                bas_tipo = (SELECT tipo_base_id FROM tipos_bases WHERE tipo = ? LIMIT 1),
                bas_manejador = (SELECT manejador_id FROM manejadores WHERE manejador = ? LIMIT 1),
                bas_tipo_ambiente = ?
            WHERE 
                base_datos_id = ?`,
            [   
                base_datos,estatus,cantidad_usuarios, tipo, 
                manejador,tipo_ambiente,id
            ]
        );
        console.log('ACTUALIZACION EXITOSA'); 
            
        res.json('UPDATE EXITOSO');

    } catch (error) {
        console.log("ERROR_UPDATE_ITEMS");
        console.error(error);
    }
};




// *********************************** OBTENER INFORMACION GENERAL ***********************************
const general = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
        SELECT 
            bases_datos.base_datos_id,base_datos,bas_estatus,tipo,manejador,version_manejador,
            bas_cantidad_usuarios,bas_tipo_ambiente
        FROM bases_datos
            JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
            JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
            JOIN versiones_manejadores ON manejadores.manejador_id = versiones_manejadores.manejador_id
        WHERE bases_datos.base_datos_id = ?`, [id]);

        res.send(data[0]);

    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER SERVIDOR ***********************************
const aplicacion = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,
                apl_prioridad,apl_critico,apl_alcance,apl_codigo_fuente,
                apl_version,apl_direccion,apl_cantidad_usuarios,region
            FROM aplicaciones
                JOIN aplicacion_basedatos ON aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                JOIN bases_datos ON bases_datos.base_datos_id = aplicacion_basedatos.base_datos_id
                JOIN regiones ON aplicaciones.apl_region = regiones.region_id
            WHERE bases_datos.base_datos_id = ?;`, 
            [id]);

        res.send(data[0]);

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
                servidores.servidor_id,servidor,ser_direccion,ser_estatus,sistema,sistema_version,region, localidad
            FROM bases_datos
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON basedatos_servidor.servidor_id = servidores.servidor_id
                JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
                JOIN regiones ON servidores.ser_region_id = regiones.region_id
                JOIN localidades ON servidores.ser_localidad_id = localidades.localidad_id
            WHERE bases_datos.base_datos_id = ?;`, 
            [id]);

        const modelos = await pool.query(`
            SELECT 
                modelo,mod_marca,mod_serial,
                mod_velocidad_cpu,mod_cantidad_cpu, mod_memoria
            FROM bases_datos
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON basedatos_servidor.servidor_id = servidores.servidor_id
                JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
            WHERE bases_datos.base_datos_id = ?;`, 
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





module.exports = { 
    obtenerDatos,
    obtenerBaseDatos,
    obtenerBusqueda,
    crearBaseDatos,
    actualizarBaseDatos,
    general,aplicacion,servidor
 };