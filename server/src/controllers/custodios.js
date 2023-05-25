const pool = require('../config');
const { generarLogAuditoria } = require('../helpers/auditoria');

const query = `
SELECT 
    custodios.custodio_id, cus_nombre, cus_apellido ,cus_indicador ,cus_cedula ,
    telefono, cargo, gerencia, region, localidad
FROM custodios
    LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
	LEFT JOIN gerencias ON custodios.cus_gerencia = gerencias.gerencia_id 
	LEFT JOIN cargos ON custodios.cus_cargo = cargos.cargo_id 
    LEFT JOIN regiones ON regiones.region_id = custodios.cus_region
    LEFT JOIN localidades ON localidades.localidad_id = custodios.cus_localidad`;

// *********************************** OBTENER LOS DATOS POR TERMINO DE BUSQUEDA ***********************************
const obtenerBusqueda = async (req,res) => {
    try {
        const { term, cargo,gerencia,region } = req.body;
        const termino = '%' + term + '%';
        let data;

        if (term === undefined || null)
            return res.status(404).json({ message: "Error al recibir consulta" });
    

        if(cargo){
            data = await pool.query(
                `${query}
                WHERE (custodios.custodio_id LIKE ? 
                    OR cus_indicador LIKE ?  
                    OR cus_nombre LIKE ?  
                    OR cus_apellido LIKE ? ) 
                    AND cargo LIKE ? ORDER BY custodios.custodio_id ASC;`, 
            [termino,termino,termino,termino,cargo]);
        }
        else if(region){
            data = await pool.query(
                `${query}
                WHERE (custodios.custodio_id LIKE ? 
                    OR cus_indicador LIKE ?  
                    OR cus_nombre LIKE ?  
                    OR cus_apellido LIKE ? ) 
                    AND region LIKE ? ORDER BY custodios.custodio_id ASC;`, 
            [termino,termino,termino,termino,region]);
        }
        else if(gerencia){
            data = await pool.query(
                `${query}
                WHERE (custodios.custodio_id LIKE ? 
                    OR cus_indicador LIKE ?  
                    OR cus_nombre LIKE ?  
                    OR cus_apellido LIKE ? ) 
                    AND gerencia LIKE ? ORDER BY custodios.custodio_id ASC;`, 
            [termino,termino,termino,termino,gerencia]);
        }
        else{
            if(term===''){
                data = await pool.query(`
                    ${query}
                    ORDER BY custodios.custodio_id ASC`);
            }
            else{
                data = await pool.query(`
                    ${query}
                    WHERE (custodios.custodio_id LIKE ? 
                        OR cus_indicador LIKE ?  
                        OR cus_nombre LIKE ?  
                        OR cus_apellido LIKE ? ) 
                    ORDER BY custodios.custodio_id ASC`, 
                [termino,termino,termino,termino]);
            }
        }

        res.json(data[0]);
        
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL BUSCAR CUSTODIOS' });
    }
};

// *********************************** OBTENER FALLAS ***********************************
const registrarCustodio = async (req,res) => {
    try {
        const { nombre,apellido,indicador,cedula,telefono,cargo,gerencia,region,localidad,usuario_registro } = req.body;
        
        const query = await pool.query(`SELECT custodio_id FROM custodios WHERE cus_indicador = ?`, [indicador]); 
        const custodio = query[0][0];

        // ****************************** VERIFICA QUE LA custodio NO EXISTA ******************************
        if(custodio){
            return res.status(401).json({ message: 'PERSONA YA REGISTRADA' });
        }
        else{
            await pool.query(` 
                INSERT INTO custodios
                    (cus_nombre,cus_apellido,cus_indicador,cus_cedula,cus_cargo,
                    cus_gerencia,cus_region,cus_localidad,cus_usuario_registro,cus_usuario_actualizo)
                VALUES
                    (?,?,?,?,?,?,
                    (SELECT region_id FROM regiones WHERE region = ?),
                    (SELECT localidad_id FROM localidades WHERE localidad = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                    (SELECT usuario_id FROM usuarios WHERE indicador = ?));`, 
                [nombre,apellido,indicador,cedula,cargo,gerencia,region,localidad,usuario_registro,usuario_registro]);

            const buscarcustodio = await pool.query(
                `SELECT custodio_id FROM custodios WHERE cus_indicador = ?`, [indicador]);
            let custodio_id = buscarcustodio[0][0].custodio_id;

            await pool.query( 
                `INSERT INTO telefonos (custodio_id,telefono) VALUES (?,?)`, [custodio_id,telefono] );

            const datosAuditoria = {
                mensaje : `Registro de Custodio ${indicador}`,
                ip : req.ip,
                usuario_id : req.usuario_id
            }
            generarLogAuditoria(datosAuditoria);

            res.send(`${custodio_id}`);
        }
        

    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL REGISTRAR CUSTODIOS' });
    }
};

// *********************************** ELIMINAR REGISTRO ***********************************
const eliminarCustodio = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM custodios WHERE custodio_id = ?', [id]);

        const datosAuditoria = {
            mensaje : `Eliminado de Custodio ${id}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.sendStatus(204);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL ELIMINAR CUSTODIOS' });
    }
};

// *********************************** ACTUALIZAR REGISTRO ***********************************
const actualizarCustodio = async (req,res) => {
    const { id } = req.params;
    const { nombre, apellido, region, localidad, gerencia, cargo, telefono, usuario_actualizo } = req.body;
    
    try {
        await pool.query(`
            UPDATE 
                custodios 
            SET  
                cus_nombre = ?,
                cus_apellido = ?,
                cus_region = (SELECT region_id FROM regiones WHERE region = ?),
                cus_localidad = (SELECT localidad_id FROM localidades WHERE localidad = ?),
                cus_gerencia = (SELECT gerencia_id FROM gerencias WHERE gerencia = ?),
                cus_cargo = (SELECT cargo_id FROM cargos WHERE cargo = ?),
                cus_usuario_actualizo = (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                cus_fecha_actualizacion = now()
            WHERE 
                custodio_id = ?;`, [nombre, apellido, region, localidad, gerencia, cargo, usuario_actualizo, id]
        );

        await pool.query( 
            `UPDATE telefonos SET telefono = ? WHERE custodio_id = ?`, [telefono, id] );
            
        const datosAuditoria = {
            mensaje : `Actualizacion de Custodio ${id}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);
        
        res.send('ACTUALIZACION EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL ACTUALIZAR CUSTODIOS' });
    }
 }


 
// *********************************** OBTENER INFORMACION GENERAL ***********************************
const general = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
        SELECT 
            custodios.custodio_id, cus_nombre, cus_apellido ,cus_indicador ,cus_cedula ,
            telefono, cargo, gerencia, region, localidad
        FROM custodios
            LEFT JOIN telefonos ON custodios.custodio_id = telefonos.custodio_id 
            LEFT JOIN gerencias ON custodios.cus_gerencia = gerencias.gerencia_id 
            LEFT JOIN cargos ON custodios.cus_cargo = cargos.cargo_id 
            LEFT JOIN regiones ON regiones.region_id = custodios.cus_region
            LEFT JOIN localidades ON localidades.localidad_id = custodios.cus_localidad
        WHERE custodios.custodio_id = ?`, [id]);

        const data1 = await pool.query(`
            SELECT 
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,estatus,
                prioridad,apl_critico,alcance,apl_codigo_fuente,
                apl_version,apl_direccion,apl_cantidad_usuarios,region
            FROM aplicaciones
                LEFT JOIN custodios_funcionales ON custodios_funcionales.aplicacion_id = aplicaciones.aplicacion_id
                LEFT JOIN custodios ON custodios_funcionales.custodio_id = custodios.custodio_id
                LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
                LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
                LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
                LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
            WHERE custodios.custodio_id = ?;`, [id]);

        const data2 = await pool.query(`
            SELECT 
                aplicaciones.aplicacion_id,apl_acronimo,apl_nombre,apl_descripcion,estatus,
                prioridad,apl_critico,alcance,apl_codigo_fuente,
                apl_version,apl_direccion,apl_cantidad_usuarios,region
            FROM aplicaciones
                LEFT JOIN custodios_tecnicos ON custodios_tecnicos.aplicacion_id = aplicaciones.aplicacion_id
                LEFT JOIN custodios ON custodios_tecnicos.custodio_id = custodios.custodio_id
                LEFT JOIN estatus ON aplicaciones.apl_estatus = estatus.estatus_id
                LEFT JOIN prioridades ON aplicaciones.apl_prioridad = prioridades.prioridad_id
                LEFT JOIN alcances ON aplicaciones.apl_alcance = alcances.alcance_id
                LEFT JOIN regiones ON aplicaciones.apl_region = regiones.region_id
            WHERE custodios.custodio_id = ?;`, [id]);

        const respuesta = {
            general: data[0][0],
            aplicacionFuncional: data1[0],
            aplicacionTecnico: data2[0],
        };

        const datosAuditoria = {
            mensaje : `Visualizacion de Custodio ${data[0][0].cus_indicador}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.send(respuesta);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL OBTENER CUSTODIOS' });
    }
};

module.exports = { 
    obtenerBusqueda,registrarCustodio,eliminarCustodio,actualizarCustodio, general
 };