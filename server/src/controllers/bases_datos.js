const pool = require('../config');

const query = `
SELECT 
    bases_datos.base_datos_id, base_datos, estatus, tipo, manejador, ambiente, 
    base_cantidad_usuarios, DATE_FORMAT (base_fecha_actualizacion, '%d-%m-%Y %H:%i') as base_fecha_actualizacion, indicador 
FROM bases_datos
    JOIN estatus ON bases_datos.base_estatus = estatus.estatus_id
    JOIN tipos_bases ON tipos_bases.tipo_id = bases_datos.base_tipo
    JOIN manejadores ON manejadores.manejador_id = bases_datos.base_manejador
    JOIN ambientes ON ambientes.ambiente_id = bases_datos.base_ambiente
    JOIN usuarios ON usuarios.usuario_id = bases_datos.base_usuario_actualizo`;

// *********************************** OBTENER TODOS LOS DATOS ***********************************
const obtenerDatos = async (req,res) => {
    try {
        const data = await pool.query(`
            SELECT
                bases_datos.base_datos_id,base_datos,base_estatus,tipo,manejador,
                base_cantidad_usuarios,ambiente, servidor, region, localidad
            FROM bases_datos
                JOIN estatus ON bases_datos.base_estatus = estatus.estatus_id
                JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
                JOIN ambientes ON ambientes.ambiente_id = bases_datos.base_ambiente
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
                bases_datos.base_datos_id,base_datos,base_estatus,tipo,manejador,version_manejador,
                base_cantidad_usuarios,base_ambiente
            FROM bases_datos
                JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.base_datos_id
                JOIN manejadores ON manejadores.manejador_id = bases_datos.base_datos_id
                JOIN versiones_manejadores ON manejadores.manejador_id = versiones_manejadores.manejador_id
            WHERE bases_datos.base_datos_id = ?;`, [id]);

        res.send(data[0][0]);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term,estatus,tipo,manejador,ambiente,count,orden } = req.body;
        const termino = '%' + term + '%';
        let data;

        if (term === undefined || null)
        return res.status(404).json({ message: "Error al recibir consulta" });


        if(estatus){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND estatus LIKE ? ORDER BY bases_datos.base_datos_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,estatus]);
        }
        else if(tipo){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND tipo LIKE ? ORDER BY bases_datos.base_datos_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,tipo]);
        }
        else if(manejador){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND manejador LIKE ? ORDER BY bases_datos.base_datos_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,manejador]);
        }
        else if(ambiente){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND ambiente LIKE ? ORDER BY bases_datos.base_datos_id ${orden ? orden : 'ASC'};`, 
            [termino,termino,ambiente]);
        }
        else{
            if(term===' '){
                data = await pool.query(`
                ${query} 
                ORDER BY bases_datos.base_datos_id ${orden ? orden : 'ASC'}`);
            }
            else{
                data = await pool.query(`
                ${query}
                WHERE 
                    (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? ) 
                ORDER BY bases_datos.base_datos_id ${orden ? orden : 'ASC'}`, 
                    [termino,termino,parseInt(count)]
                );
            } 
        }
        
        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** CREAR REGISTRO ***********************************
const crearBaseDatos = async (req,res) => {
    try {
        const {
            base_datos,estatus,cantidad_usuarios, tipo, manejador, 
            version_manejador,ambiente, usuario_registro, select_servidor,
        } = req.body;

        const query = await pool.query(
            `SELECT * FROM bases_datos WHERE base_datos = ?`, [base_datos]);
        const bd = query[0][0];

        if(!select_servidor[0]){
            return res.status(401).json({ message: 'ERROR, SERVIDOR SIN SELECCIONAR' });
        }

        // ****************************** VERIFICA QUE LA APLICACION NO EXISTA ******************************
        if(bd){
            return res.status(401).json({ message: 'ERROR, BASE DE DATOS YA EXISTE' });
        }
        else{

            // if(version_manejador){
            //     const datos_version = await pool.query(
            //         `INSERT INTO versiones_manejadores (version_manejador,manejador_id) 
            //         VALUES 
            //             (?,?);`, 
            //         [version_manejador,manejador]
            //     );
            //     console.log('REGISTRO MANEJADOR');
            // }

            const datos_basedatos = await pool.query(
                `INSERT INTO bases_datos 
                    (base_datos,base_estatus,base_tipo,base_manejador,base_ambiente,base_cantidad_usuarios,
                    base_usuario_registro,base_usuario_actualizo) 
                VALUES 
                    (?,?,?,?,?,?,
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?)
                );`, 
                [base_datos,estatus,tipo,manejador,ambiente,cantidad_usuarios,usuario_registro,usuario_registro]
            );

            const selectBase = await pool.query(`SELECT * FROM bases_datos ORDER BY base_datos_id DESC LIMIT 1`);
            let base_datos_id = selectBase[0][0].base_datos_id;


            if(select_servidor){

                for (const element of select_servidor) {
            
                    const datos_ser = await pool.query(
                        `INSERT INTO basedatos_servidor (base_datos_id,servidor_id) VALUES (?,?);`,
                    [base_datos_id,element.servidor_id]);
                }

            }
            
            res.send('CREACION EXITOSA');
        }
    } catch (error) {
        console.log("ERROR_CREATE_ITEMS");
    }
};


// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarBaseDatos = async (req,res) => {
    try {
        const { id } = req.params;

        const {
            base_datos,estatus,cantidad_usuarios, tipo, manejador, 
            manejador_version,ambiente, select_servidor
        } = req.body;

        // ACTUALIZAR LA BASE DE DATOS
        const [result] = await pool.query(
            `UPDATE bases_datos  SET 
                base_datos = ?,
                base_estatus = (SELECT estatus_id FROM estatus WHERE estatus = ?),
                base_cantidad_usuarios = ?,
                base_tipo = (SELECT tipo_id FROM tipos_bases WHERE tipo = ?),
                base_manejador = (SELECT manejador_id FROM manejadores WHERE manejador = ?),
                base_ambiente = (SELECT ambiente_id FROM ambientes WHERE ambiente = ?),
                base_fecha_actualizacion = now()
            WHERE 
                base_datos_id = ?`,
            [   
                base_datos,estatus,cantidad_usuarios, tipo, 
                manejador,ambiente,id
            ]
        );

        const deleteSer = await pool.query(`DELETE FROM basedatos_servidor WHERE base_datos_id = ?;`,[id]);
        for (const element of select_servidor) {
            const datos_ser = await pool.query(
                `INSERT INTO basedatos_servidor (base_datos_id,servidor_id) VALUES (?,?)`,
            [id,element.servidor_id]); 
        }

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
            bases_datos.base_datos_id,base_datos,estatus,tipo, manejador,
            base_cantidad_usuarios,ambiente,
            DATE_FORMAT (base_fecha_actualizacion, '%d-%m-%Y %H:%i') as base_fecha_actualizacion
        FROM bases_datos
            JOIN estatus ON bases_datos.base_estatus = estatus.estatus_id
            JOIN tipos_bases ON tipos_bases.tipo_id = bases_datos.base_tipo
            JOIN manejadores ON manejadores.manejador_id = bases_datos.base_manejador
            JOIN ambientes ON ambientes.ambiente_id = bases_datos.base_ambiente
        WHERE bases_datos.base_datos_id = ?`, [id]);

        res.send(data[0]);

    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER APLICACIONES ***********************************
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
                LEFT JOIN aplicacion_basedatos ON aplicaciones.aplicacion_id = aplicacion_basedatos.aplicacion_id
                LEFT JOIN bases_datos ON bases_datos.base_datos_id = aplicacion_basedatos.base_datos_id
                LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
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
                servidores.servidor_id,servidor,ser_direccion,estatus,sistema,modelo,marca,region, localidad
            FROM bases_datos
                JOIN basedatos_servidor ON bases_datos.base_datos_id = basedatos_servidor.base_datos_id
                JOIN servidores ON basedatos_servidor.servidor_id = servidores.servidor_id
                JOIN estatus ON servidores.ser_estatus = estatus.estatus_id
                JOIN sistemas_operativos ON sistemas_operativos.sistema_id = servidores.ser_sistema
                JOIN modelos ON modelos.modelo_id = servidores.ser_modelo
                JOIN marcas ON marcas.marca_id = modelos.mod_marca
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