
require('dotenv').config();
const mysql = require('mysql2/promise');

// CONFIGURACION CONEXION BASE DE DATOS
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT, 
    database: process.env.DB_NAME,
}, console.log('Conexion Correcta'));

module.exports = pool; 