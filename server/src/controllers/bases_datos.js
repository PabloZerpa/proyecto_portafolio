const pool = require('../config');

const query = `
SELECT 
bases_datos.base_datos_id, base_datos, bas_estatus, tipo, manejador, tipo_ambiente, 
bas_cantidad_usuarios, bas_fecha_actualizacion, indicador 
FROM bases_datos
JOIN tipos_bases ON tipos_bases.tipo_base_id = bases_datos.bas_tipo
JOIN manejadores ON manejadores.manejador_id = bases_datos.bas_manejador
JOIN tipos_ambientes ON tipos_ambientes.tipo_ambiente_id = bases_datos.bas_tipo_ambiente
JOIN usuarios ON usuarios.usuario_id = bases_datos.bas_usuario_actualizo`;

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
        const { term,estatus,tipo,manejador,ambiente,count,orden } = req.body;
        const termino = '%' + term + '%';
        let data;

        console.log(term,estatus,tipo,manejador,ambiente,count,orden);

        if (term === undefined || null)
        return res.status(404).json({ message: "Error al recibir consulta" });


        if(estatus){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND estatus LIKE ? ORDER BY bases_datos.base_datos_id ${orden};`, 
            [termino,termino,estatus]);
        }
        else if(tipo){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND tipo LIKE ? ORDER BY bases_datos.base_datos_id ${orden};`, 
            [termino,termino,tipo]);
        }
        else if(manejador){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND manejador LIKE ? ORDER BY bases_datos.base_datos_id ${orden};`, 
            [termino,termino,manejador]);
        }
        else if(ambiente){
            data = await pool.query(
                `${query}
                WHERE (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? )
                    AND tipo_ambiente LIKE ? ORDER BY bases_datos.base_datos_id ${orden};`, 
            [termino,termino,ambiente]);
        }
        else{
            data = await pool.query(`
                ${query}
                WHERE 
                    (bases_datos.base_datos_id LIKE ? OR 
                    base_datos LIKE ? ) 
                ORDER BY bases_datos.base_datos_id ${orden}`, 
                    [termino,termino,parseInt(count)]
            );
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
            version_manejador,tipo_ambiente, usuario_registro,
            select_aplicacion, select_servidor,
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
            console.log(base_datos,estatus,cantidad_usuarios, tipo, manejador, 
                version_manejador,tipo_ambiente, usuario_registro,
                select_aplicacion, select_servidor);

            if(version_manejador){
                const datos_version = await pool.query(
                    `INSERT INTO versiones_manejadores (version_manejador,manejador_id) 
                    VALUES 
                        (?,?);`, 
                    [version_manejador,manejador]
                );
                console.log('REGISTRO MANEJADOR');
            }

            const datos_basedatos = await pool.query(
                `INSERT INTO bases_datos 
                    (base_datos,bas_estatus,bas_tipo,bas_manejador,bas_tipo_ambiente,bas_cantidad_usuarios,
                    bas_usuario_registro,bas_usuario_actualizo) 
                VALUES 
                    (?,?,?,?,?,?,
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?)
                );`, 
                [base_datos,estatus,tipo,manejador,tipo_ambiente,cantidad_usuarios,usuario_registro,usuario_registro]
            );
            console.log('REGISTRO GENERAL BASE DE DATOS');

            const selectBase = await pool.query(`SELECT * FROM bases_datos ORDER BY base_datos_id DESC LIMIT 1`);
            let base_datos_id = selectBase[0][0].base_datos_id;

            if(select_aplicacion){
                const selectAplicacion = await pool.query(`
                    SELECT 
                        aplicacion_id FROM aplicaciones 
                    WHERE 
                        apl_acronimo = ? OR apl_nombre = ?`, 
                    [select_aplicacion,select_aplicacion]);

                const aplicacion_id = selectAplicacion[0][0].aplicacion_id;
                
                const bas_apl = await pool.query(
                    `INSERT INTO aplicacion_basedatos (aplicacion_id,base_datos_id) VALUES (?,?);`, 
                    [aplicacion_id, base_datos_id]
                );
                console.log('RELACION BASE-APP');
            }
            if(select_servidor){
                const selectServidor = await pool.query(`SELECT servidor_id FROM servidores WHERE servidor = ?`, [select_servidor]);
                const servidor_id = selectServidor[0][0].servidor_id;
                
                const bas_ser = await pool.query(
                    `INSERT INTO basedatos_servidor (base_datos_id,servidor_id) VALUES (?,?);`, 
                    [base_datos_id, servidor_id]
                );
                console.log('RELACION BASE-SERVIDOR');
            }
            

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