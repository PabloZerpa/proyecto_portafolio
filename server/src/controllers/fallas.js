
const pool = require('../config');
const { matchedData } = require("express-validator");

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


module.exports = { fallas,registrarFalla,buscarFalla,actualizarFalla, };