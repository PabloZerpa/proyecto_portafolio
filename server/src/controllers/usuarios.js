
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../helpers/token');
const { encriptar } = require('../helpers/encriptar');

// *************** OBTENER USUARIO ***************
const obtenerUsuarios = async (req,res) => {
    try{
        const data = await pool.query(`
            SELECT usuario_id, indicador, rol, gerencia 
            FROM usuarios
            JOIN gerencias ON gerencias.gerencia_id = usuarios.gerencia_id`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

 // *************** OBTENER USUARIO POR BUSQUEDA ***************
const obtenerPorBusqueda = async (req,res) => {

    const { term } = req.body;
    const termino = `%${term}%`;

    try{
        const data = await pool.query(`
            SELECT usuario_id, indicador, rol, gerencia  
            FROM usuarios 
            JOIN gerencias ON gerencias.gerencia_id = usuarios.gerencia_id
            WHERE usuario_id LIKE ? OR indicador = ? OR gerencia LIKE ? ORDER BY usuario_id ASC`,
            [termino,termino,termino]
        );
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

// *************** CREAR USUARIO ***************
const crearUsuario = async (req,res) => {
  
    const { indicador, rol, gerencia } = req.body;
  
    try {
        const query = await pool.query(
            `INSERT INTO usuarios (indicador, rol, gerencia) VALUES (?,?,?)`, 
                [indicador, rol, gerencia]
        );
        res.send('CREACION DE USUARIO EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
}

// *************** CAMBIAR PERMISOS ***************
const cambiarPermisos = async (req,res) => {
    const { id } = req.params;
    const { rol, gerencia } = req.body;
   
    try {
        const query = await pool.query(`
            UPDATE 
                usuarios 
            SET 
                rol = ?, 
                gerencia_id = (SELECT gerencia_id FROM gerencias WHERE gerencia = ?) 
            WHERE 
                usuario_id = ?;`, [rol, gerencia, id]
        );
        
        res.send('ACTUALIZACION DE ROL EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }

 // *************** LOGEAR USUARIO ***************
const cambiarPassword = async (req,res) => {
  
    const { id } = req.params;
    const { password } = req.body;
    const passwordNuevo = await encriptar(password);
   
    try {
        const query = await pool.query(
            `UPDATE usuarios SET password = ? WHERE usuario_id = ?;`, [passwordNuevo, id]
        );
        res.send('ACTUALIZACION DE CONTRASEÑA EXITOSA');
    } catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }


module.exports = { obtenerUsuarios, crearUsuario, cambiarPermisos, cambiarPassword, obtenerPorBusqueda };