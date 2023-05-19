
const pool = require('../config');
const { matchedData } = require("express-validator");

const { generarLogAuditoria } = require('../helpers/auditoria');
// *********************************** OBTENER FALLAS ***********************************
const fallas = async (req,res) => {
    try {
        const { id } = req.params;

        const data = await pool.query(`
            SELECT 
                falla_id,fal_nombre,elemento,fal_descripcion,fal_solucion,fal_impacto
            FROM fallas
                LEFT JOIN elementos ON elementos.elemento_id = fallas.fal_elemento
            WHERE fallas.falla_id = ?;`, 
            [id]); 
            
        const respuestas = {
            datos: data[0],
        }

        const datosAuditoria = {
            mensaje : `Visualizacion de Falla ${id}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);
                
        res.send(respuestas);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};

// *********************************** REGISTRAR FALLAS ***********************************
const registrarFalla = async (req,res) => {
    try {
        
        const { nombre,elemento,impacto,descripcion,solucion,usuario_creador } = req.body;

        await pool.query(`
            INSERT INTO fallas
                (fal_nombre,fal_elemento,fal_descripcion,fal_solucion,fal_impacto,fal_usuario_creador,fal_usuario_actualizo)
            VALUES
                (?,
                (SELECT elemento_id FROM elementos WHERE elemento = ?),
                ?,?,?,
                (SELECT usuario_id FROM usuarios WHERE indicador = ?),
                (SELECT usuario_id FROM usuarios WHERE indicador = ?));`, 
            [nombre,elemento,descripcion,solucion,impacto,usuario_creador,usuario_creador]); 
                
        const datosAuditoria = {
            mensaje : `Registro de Falla ${nombre} `,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);
        
        res.send('FALLA REGISTRADA CORRECTAMENTE');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR_GET_ITEMS' });
    }
};


// *********************************** OBTENER FALLAS ***********************************
const buscarFalla = async (req,res) => {
    const { term } = req.body;
    const termino = `%${term}%`;
    let data = null;

    if (term === undefined || null)
        return res.status(404).json({ message: "Error al recibir consulta" });

    try{
        if(term===''){
            data = await pool.query(`
                SELECT 
                    falla_id, fal_nombre, elemento, fal_impacto, fal_descripcion, fal_solucion
                FROM fallas
                    LEFT JOIN elementos ON elementos.elemento_id = fallas.fal_elemento
                ORDER BY falla_id ASC;`);
        }
        else{
            data = await pool.query(`
                SELECT falla_id, fal_nombre, elemento, fal_impacto, fal_descripcion, fal_solucion
                FROM fallas
                    LEFT JOIN elementos ON elementos.elemento_id = fallas.fal_elemento
                WHERE 
                    falla_id LIKE ? OR 
                    fal_nombre LIKE ? OR 
                    elemento LIKE ? OR 
                    fal_impacto LIKE ? OR 
                    fal_descripcion LIKE ? OR 
                    fal_solucion LIKE ?
                ORDER BY falla_id ASC;`,
                [termino,termino,termino,termino,termino,termino,termino]
            );
        }

        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
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

        const datosAuditoria = {
            mensaje : `Actualizacion de Falla ${id}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);
        
        res.send('ACTUALIZACION EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
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
        console.log("ERROR_DELETE_ITEMS");
    }
};

module.exports = { fallas,registrarFalla,buscarFalla,actualizarFalla,eliminarFalla };