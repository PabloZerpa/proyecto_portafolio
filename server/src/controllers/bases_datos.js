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
        console.log('OBTENER DATOS');
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


// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        console.log('OBTENER BUSQUEDA');
        const { term,count,orden,region } = req.body;
        const termino = '%' + term + '%';
        let data;

        console.log(term,count,orden);

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
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje,lenguaje2,lenguaje3, framework,framework2,framework3, select_base, select_servidor,
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador, bas_manejador_version, base_tipo_ambiente,
            servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,base_servidor,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,

            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_region,tecnico_localidad,
        } = req.body;

        console.log(
            apl_acronimo,apl_nombre,apl_descripcion,apl_region,
            apl_version,apl_estatus,apl_prioridad,apl_critico,apl_alcance,
            apl_codigo_fuente,apl_direccion,apl_cantidad_usuarios,
            plataforma,lenguaje,lenguaje2,lenguaje3, framework,framework2,framework3, select_base, select_servidor,
            base_datos,base_estatus,base_cantidad_usuarios, base_tipo, base_manejador, bas_manejador_version,
            base_tipo_ambiente,servidor, ser_estatus,ser_direccion, ser_sistema,ser_region,ser_localidad,base_servidor,
            ser_sistemas_version,ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            man_frecuencia,man_horas_prom,man_horas_anuales, 
            doc_descripcion,doc_tipo, doc_direccion, apl_fecha_registro,

            funcional_nombre,funcional_apellido,funcional_indicador,funcional_cedula,funcional_cargo,funcional_telefono,
            funcional_gerencia,funcional_region,funcional_localidad,
            tecnico_nombre,tecnico_apellido,tecnico_indicador,tecnico_cedula,tecnico_cargo,tecnico_telefono,
            tecnico_gerencia,tecnico_region,tecnico_localidad,
        );

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

            await verificarServidor(aplicacion_id,select_servidor,servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistemas_version,ser_marca,ser_modelo,ser_serial,
                ser_cantidad_cpu, ser_velocidad_cpu, ser_memoria, ser_region, ser_localidad);
            await verificarBase(aplicacion_id,select_base,base_datos,base_manejador,bas_manejador_version,base_tipo,base_estatus,
                base_tipo_ambiente,base_cantidad_usuarios,base_servidor);

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
const actualizarBaseDatos = async (req,res) => {
    try {
        console.log('EN EN UPDATE DEL SERVER');
        const { id } = req.params;
        const {
            apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,apl_cliente,
            apl_cantidad_usuarios,apl_critico,apl_licencia,apl_direccion,apl_codigo_fuente,apl_alcance,
            apl_fecha_registro,plataforma,lenguaje,framework,fra_version,
            servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistema_version,
            ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            base_datos,base_estatus,base_direccion,base_manejador,
            base_tipo,base_tipo_ambiente,base_cantidad,base_servidor,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales
        } = req.body;

        console.log(apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_version,apl_cliente,
            apl_cantidad_usuarios,apl_critico,apl_licencia,apl_direccion,apl_codigo_fuente,apl_alcance,
            apl_fecha_registro,plataforma,lenguaje,framework,fra_version,
            servidor,ser_estatus,ser_direccion,ser_sistema,ser_sistema_version,
            ser_marca,ser_modelo,ser_serial,ser_cantidad_cpu,ser_velocidad_cpu,ser_memoria,
            base_datos,base_estatus,base_direccion,base_manejador,
            base_tipo,base_tipo_ambiente,base_cantidad,base_servidor,
            doc_descripcion,doc_direccion,doc_tipo,
            man_frecuencia,man_horas_prom,man_horas_anuales);

        // ACTUALIZAR EL ID DEL CLIENTE EN APLICACIONES
        // const [result] = await pool.query(
        //     `UPDATE aplicaciones  SET 
        //         apl_acronimo = ?,apl_nombre = ?,apl_descripcion = ?,apl_estatus = ?,apl_prioridad = ?,apl_critico = ?,
        //         apl_licencia = ?,apl_codigo_fuente = ?,apl_alcance = ?,cliente_id = ?,apl_fecha_registro = ?
        //     WHERE 
        //         aplicacion_id = ?`,
        //     [
        //         apl_acronimo,apl_nombre,apl_descripcion,apl_estatus,apl_prioridad,apl_critico,
        //         apl_licencia,apl_codigo_fuente,apl_alcance,cliente_id,,apl_fecha_registro,id
        //     ]
        // );
        // console.log('ACTUALIZACION EXITOSA');
            
        //const [rows] = await pool.query("SELECT * FROM apps WHERE id = ?", [id]);
        //res.json(rows[0]);
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
        console.log(id);

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
        console.log(data[0]);

        //res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER SERVIDOR ***********************************
const aplicacion = async (req,res) => {
    try {
        const { id } = req.params;
        console.log(id);

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
        //console.log(data[0]);

        // const respuestas = {
        //     datos: data[0],
        //     plataformas: plataformas[0],
        //     lenguajes: lenguajes[0],
        // }    
        // res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER SERVIDOR ***********************************
const servidor = async (req,res) => {
    try {
        const { id } = req.params;
        console.log(id);

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
    obtenerBusqueda,
    crearBaseDatos,
    actualizarBaseDatos,
    general,aplicacion,servidor
 };