const pool = require('../config');

const query = `
SELECT 
    servidores.servidor_id,servidor,estado as estatus,ser_direccion,sistema,modelo,marca,
    region,localidad,DATE_FORMAT (ser_fecha_actualizacion, '%d-%m-%Y %H:%i') as ser_fecha_actualizacion,indicador
FROM servidores
    LEFT JOIN estados ON servidores.ser_estatus = estados.estado_id
    LEFT JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
    LEFT JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
    LEFT JOIN marcas ON marcas.marca_id = modelos.mod_marca
    LEFT JOIN regiones ON regiones.region_id = servidores.ser_region_id
    LEFT JOIN localidades ON localidades.localidad_id = servidores.ser_localidad_id
    LEFT JOIN usuarios ON usuarios.usuario_id = servidores.ser_usuario_actualizo`;

// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term,estatus,region,sistema,marca,orden } = req.body;
        const termino = '%' + term + '%';
        let data;

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
    

        if(estatus){
            data = await pool.query(
                `${query}
                WHERE (servidores.servidor_id LIKE ? OR servidor LIKE ? ) 
                    AND estado LIKE ? ORDER BY servidores.servidor_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,estatus]);
        }
        else if(region){
            data = await pool.query(
                `${query}
                WHERE (servidores.servidor_id LIKE ? OR servidor LIKE ? ) 
                    AND region LIKE ? ORDER BY servidores.servidor_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,region]);
        }
        else if(sistema){
            data = await pool.query(
                `${query}
                WHERE (servidores.servidor_id LIKE ? OR servidor LIKE ? ) 
                    AND sistema LIKE ? ORDER BY servidores.servidor_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,sistema]);
        }
        else if(marca){
            data = await pool.query(
                `${query}
                WHERE (servidores.servidor_id LIKE ? OR servidor LIKE ? ) 
                    AND marca LIKE ? ORDER BY servidores.servidor_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,marca]);
        }
        else{
            if(term===''){
                data = await pool.query(`
                    ${query}
                    ORDER BY servidores.servidor_id ${orden ? orden : 'ASC'}`, 
                [termino,termino]);
            }
            else{
                data = await pool.query(`
                    ${query}
                    WHERE (servidores.servidor_id LIKE ? OR servidor LIKE ? ) 
                    ORDER BY servidores.servidor_id ${orden ? orden : 'ASC'}`, 
                [termino,termino]);
            }
        }

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** CREAR REGISTRO ***********************************
const registrarServidor = async (req,res) => {
    try {
        const {
            servidor,estatus,direccion,sistema,version,modelo,marca,serial,
            memoria,velocidad,cantidad,region,localidad,usuario_registro
        } = req.body;

        const query = await pool.query(
            `SELECT * FROM servidores WHERE servidor = ?`, [servidor]);
        const ser = query[0][0];

        // ****************************** VERIFICA QUE LA APLICACION NO EXISTA ******************************
        if(ser){
            return res.status(401).json({ message: 'ERROR, SERVIDOR YA EXISTE' });
        }
        else{

            if(version){
                const datos_version = await pool.query(
                    `INSERT INTO versiones_sistemas (version_sistema,sistema_id) 
                    VALUES 
                        (?, ?);`, 
                    [version,sistema]
                );
            }

            let modelo_id = null;
            if(modelo){
                const datos_modelo = await pool.query(
                    `INSERT INTO modelos 
                        (modelo,mod_marca,mod_serial,mod_cantidad_cpu,mod_velocidad_cpu,mod_memoria) 
                    VALUES 
                        (?,?,?,?,?,?);
                    ;`, 
                    [modelo,marca,serial,cantidad,velocidad,memoria]
                );

                const selectModelo = await pool.query(`SELECT * FROM modelos ORDER BY modelo_id DESC LIMIT 1`);
                modelo_id = selectModelo[0][0].modelo_id;
            }

            const datos_servidor = await pool.query(
                `INSERT INTO servidores 
                    (servidor,ser_estatus,ser_direccion,ser_sistema,ser_modelo,ser_region_id,
                    ser_localidad_id,ser_usuario_registro,ser_usuario_actualizo) 
                VALUES 
                    (?,?,?,?,?,
                    (SELECT region_id FROM regiones WHERE region = ?),
                    (SELECT localidad_id FROM localidades WHERE localidad = ? AND localidades.region_id = 
                        (SELECT region_id FROM regiones WHERE region = ?)   ),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?)
                );`, 
                [servidor,estatus,direccion,sistema,modelo_id,region,localidad,region,usuario_registro,usuario_registro]
            );

            const selectServidor = await pool.query(`SELECT * FROM servidores ORDER BY servidor_id DESC LIMIT 1`);
            let servidor_id = selectServidor[0][0].servidor_id;

            res.send(`${servidor_id}`);
        }
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};


// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarServidor = async (req,res) => {
    try {

        const { id } = req.params;

        const {
            servidor,estatus,direccion,sistema,marca,modelo,serial,
            velocidad,cantidad,memoria,region,localidad,usuario_actualizo
        } = req.body;

        const query = await pool.query(`SELECT modelo_id FROM modelos WHERE mod_serial = ?;`,[serial]);
        const modelo_id = query[0][0].modelo_id;

        const query2 = await pool.query( 
            `UPDATE modelos  SET 
                mod_cantidad_cpu = ?, mod_velocidad_cpu = ?, mod_memoria = ?
            WHERE 
                modelo_id = ?`,
            [cantidad,velocidad,memoria,modelo_id]
        );

        // ACTUALIZAR SERVIDOR
        const [result] = await pool.query(
            `UPDATE servidores  SET 
                servidor = ?,
                ser_estatus = (SELECT estado_id FROM estados WHERE estado = ?),
                ser_direccion = ?,
                ser_sistema = (SELECT sistema_id FROM sistemas_operativos WHERE sistema = ?),
                ser_region_id = (SELECT region_id FROM regiones WHERE region = ?),
                ser_localidad_id = (SELECT localidad_id FROM localidades WHERE localidad = ?),
                ser_usuario_actualizo = (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                ser_fecha_actualizacion = now()
            WHERE servidor_id = ?`,
            [servidor,estatus,direccion,sistema,region,localidad,usuario_actualizo,id]
        );
            
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
            servidores.servidor_id,servidor,estado as estatus,ser_direccion,
            sistema,modelo,marca,mod_serial,mod_cantidad_cpu,mod_velocidad_cpu,mod_memoria,region,localidad,
            DATE_FORMAT (ser_fecha_actualizacion, '%d-%m-%Y %H:%i') as ser_fecha_actualizacion, indicador
        FROM servidores
            LEFT JOIN estados ON servidores.ser_estatus = estados.estado_id
            LEFT JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
            LEFT JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
            LEFT JOIN marcas ON marcas.marca_id = modelos.mod_marca
            LEFT JOIN regiones ON regiones.region_id = servidores.ser_region_id
            LEFT JOIN localidades ON localidades.localidad_id = servidores.ser_localidad_id
            LEFT JOIN usuarios ON usuarios.usuario_id = servidores.ser_usuario_actualizo
        WHERE servidores.servidor_id = ?`, [id]);
        
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
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,estatus,
                prioridad,apl_critico,alcance,apl_codigo_fuente,
                apl_version,apl_direccion,apl_cantidad_usuarios,region
            FROM aplicaciones
                LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
                LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
                LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
                LEFT JOIN aplicacion_servidor ON aplicaciones.aplicacion_id = aplicacion_servidor.aplicacion_id
                LEFT JOIN servidores ON servidores.servidor_id = aplicacion_servidor.servidor_id
                LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
            WHERE servidores.servidor_id = ?;`, 
            [id]);

        res.send(data[0]);

    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER SERVIDOR ***********************************
const basedatos = async (req,res) => {
    try {
        const { id } = req.params;
        
        const data = await pool.query(`
            SELECT 
                bases_datos.base_datos_id, base_datos, estatus, base_cantidad_usuarios, base_fecha_actualizacion,
                tipo, manejador,ambiente
            FROM bases_datos
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON basedatos_servidor.servidor_id = servidores.servidor_id
                JOIN estatus ON bases_datos.base_estatus = estatus.estatus_id
                JOIN tipos_bases ON tipos_bases.tipo_id = bases_datos.base_tipo
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_manejador
                JOIN ambientes ON ambientes.ambiente_id = bases_datos.base_ambiente
            WHERE servidores.servidor_id = ?;`, 
            [id]);
                
        res.send(data[0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


module.exports = { 
    obtenerBusqueda,
    registrarServidor,
    actualizarServidor,
    general,
    aplicacion,
    basedatos,
 };