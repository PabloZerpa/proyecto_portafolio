
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../helpers/token');

// *************** CREAR USUARIO ***************
const crearUsuario = async () => {
  
   const { indicador, rol, gerencia, subgerencia, elementos, acciones } = req.body;
  
  const query = await pool.query(
      `INSERT INTO usuarios (indicador, rol, gerencia, subgerencia) VALUES (?,?,?,?)`, 
          [indicador, rol, gerencia, subgerencia]
      );
}

// *************** LOGEAR USUARIO ***************
const cambiarPermisos = async () => {
  
    const { indicador, rol, gerencia, subgerencia, elementos, acciones } = req.body;
   
   const query = await pool.query(
       `INSERT INTO usuarios (indicador, rol, gerencia, subgerencia) VALUES (?,?,?,?)`, 
           [indicador, rol, gerencia, subgerencia]
       );
 }


module.exports = { crearUsuario, cambiarPermisos };