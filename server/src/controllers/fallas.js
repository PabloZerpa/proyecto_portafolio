
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarLogAuditoria } = require('../helpers/auditoria');

// *********************************** OBTENER FALLAS ***********************************
const fallas = async (req,res) => {
    try {
        const { id } = req.params;
        const data = await pool.query(`
            SELECT 
                falla_id,apl_acronimo,apl_nombre,fal_descripcion,fal_solucion,fal_impacto
            FROM aplicaciones
                JOIN fallas on aplicaciones.aplicacion_id = fallas.aplicacion_id
            WHERE aplicaciones.aplicacion_id = ?;`, 
            [id]); 
            
        const respuestas = {
            datos: data[0],
        }
                
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL OBTENER FALLAS' });
    }
};

// *********************************** REGISTRAR FALLAS ***********************************
const registrarFalla = async (req,res) => {
    try {
        
        const { aplicacion,impacto,descripcion,solucion,usuario_creador } = req.body;

        console.log(aplicacion,impacto,descripcion,solucion,usuario_creador);

        const x = await pool.query(`SELECT usuario_id FROM usuarios WHERE indicador = ?`, [usuario_creador]); 
        const usuario_id = x[0][0].usuario_id;
        const query = await pool.query(`SELECT aplicacion_id FROM aplicaciones WHERE apl_acronimo = ?`, [aplicacion]); 
        const aplicacion_id = query[0][0].aplicacion_id;

        console.log(aplicacion_id,descripcion,solucion,impacto, usuario_id);

        await pool.query(`
            INSERT INTO fallas
                (aplicacion_id,fal_descripcion,fal_solucion,fal_impacto,fal_usuario_creador)
            VALUES
                (?,?,?,?,?);`, 
            [aplicacion_id,descripcion,solucion,impacto, usuario_id]); 

        const datosAuditoria = {
            mensaje : `Registro de Falla`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);
                
        console.log('FALLA REGISTRADA CORRECTAMENTE');
        res.send('FALLA REGISTRADA CORRECTAMENTE');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL REGISTRAR FALLA' });
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
            SELECT falla_id, apl_acronimo, apl_nombre, fal_impacto, fal_descripcion, fal_solucion
            FROM fallas 
                JOIN aplicaciones ON aplicaciones.aplicacion_id = fallas.aplicacion_id
            WHERE 
                aplicaciones.apl_acronimo LIKE ? OR
                aplicaciones.apl_nombre LIKE ? OR
                falla_id LIKE ? OR 
                fal_impacto LIKE ? OR 
                fal_descripcion LIKE ? OR 
                fal_solucion LIKE ?
            ORDER BY falla_id ASC;`,
            [termino,termino,termino,termino,termino,termino]
        );
        console.log(data[0][0]);

        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR AL BUSCAR FALLAS' });
    }
};

// *************** CAMBIAR PERMISOS ***************
const actualizarFalla = async (req,res) => {
    const { id } = req.params;
    const { impacto, descripcion, solucion } = req.body;
   
    try {
        await pool.query(`
        UPDATE 
            fallas 
        SET 
            fal_impacto = ?,
            fal_descripcion = ?, 
            fal_solucion = ?
        WHERE falla_id = ?`, [impacto, descripcion, solucion, id]
        );

        console.log(id);

        res.send('ACTUALIZACION EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL ACTUALIZAR FALLA' });
    }
 }

 // *************** ELIMINAR FALLA ***************
 const eliminarFalla = async (req,res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM fallas WHERE falla_id = ?', [id]);

        const datosAuditoria = {
            mensaje : `Eliminada Falla ${id}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.sendStatus(204);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL ELIMINAR FALLA' });
    }
};

module.exports = { fallas,registrarFalla,buscarFalla,actualizarFalla,eliminarFalla };