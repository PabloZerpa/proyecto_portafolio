const pool = require('../config');



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
            console.log('ERROR, SERVIDOR YA EXISTE');
            return res.status(401).json({ message: 'ERROR, SERVIDOR YA EXISTE' });
        }
        else{
            console.log(servidor,estatus,direccion,sistema,version,modelo,marca,serial,
                memoria,velocidad,cantidad,region,localidad,usuario_registro);

            if(version){
                const datos_version = await pool.query(
                    `INSERT INTO versiones_sistemas (version_sistema,sistema_id) 
                    VALUES 
                        (?, ?);`, 
                    [version,sistema]
                );
                console.log('REGISTRO VERSION SISTEMA');
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
                console.log('REGISTRO MODELO' + modelo_id);
            }

            const datos_servidor = await pool.query(
                `INSERT INTO servidores 
                    (servidor,ser_estatus,ser_direccion,ser_sistema,ser_modelo,ser_region_id,
                    ser_localidad_id,ser_usuario_registro,ser_usuario_actualizo) 
                VALUES 
                    (?,?,?,?,?,?,
                    (SELECT localidad_id FROM localidades WHERE localidad_id = ? AND localidades.region_id = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?)
                );`, 
                [servidor,estatus,direccion,sistema,modelo_id,region,localidad,region,usuario_registro,usuario_registro]
            );
            console.log('REGISTRO GENERAL DEL SERVIDOR');

            console.log('CREACION EXITOSA');
            res.send('CREACION EXITOSA');
        }
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};


// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarServidor = async (req,res) => {
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


module.exports = { 
    obtenerBusqueda,
    registrarServidor,
    actualizarServidor,
 };