
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

// *********************************** REGISTRAR FALLAS ***********************************
const registrarFalla = async (req,res) => {
    try {
        
        const { aplicacion,clase,impacto,descripcion,solucion, usuario } = req.body;
        const x = await pool.query(`SELECT usuario_id FROM usuarios WHERE indicador = ?`, [usuario]); 
        const usuario_id = x[0][0].usuario_id;

        const query = await pool.query(`SELECT aplicacion_id FROM aplicaciones WHERE apl_acronimo = ?`, [aplicacion]); 
        const aplicacion_id = query[0][0].aplicacion_id;

        const data = await pool.query(`
            INSERT INTO fallas
                (aplicacion_id,fal_clase,fal_descripcion,fal_solucion,fal_impacto,fal_usuario_creador)
            VALUES
                (?,?,?,?,?,?);`, 
            [aplicacion_id,clase,descripcion,solucion,impacto, usuario_id]); 
                
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
            SELECT falla_id, apl_acronimo, apl_nombre, fal_clase, fal_impacto, fal_descripcion, fal_solucion
            FROM fallas 
                JOIN aplicaciones ON aplicaciones.aplicacion_id = fallas.aplicacion_id
            WHERE 
                aplicaciones.apl_acronimo LIKE ? OR
                aplicaciones.apl_nombre LIKE ? OR
                falla_id LIKE ? OR 
                fal_clase LIKE ? OR 
                fal_impacto LIKE ? OR 
                fal_descripcion LIKE ? OR 
                fal_solucion LIKE ?
            ORDER BY falla_id ASC;`,
            [termino,termino,termino,termino,termino,termino,termino]
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