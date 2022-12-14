const mysql = require('mysql2/promise');
require('dotenv').config();

// CONFIGURACION CONEXION BASE DE DATOS
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'elmimooscuroctrl+123',
    database: 'spotify',
}, console.log('Conexion Correcta'));

module.exports = pool; 