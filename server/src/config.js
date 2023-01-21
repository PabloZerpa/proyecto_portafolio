
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

// const pool = mysql.createPool({
//     host: 'aws-sa-east-1.connect.psdb.cloud',
//     user: 'vx1k50oul48ie25s062z',
//     password: 'pscale_pw_qVmOVHfYbK3wk4CWy7LoZ3Frops6NSvWaXdxMeadX5V',
//     database: 'test',
//     ssl: { rejectUnauthorized: false }
// }, console.log('Conexion Correcta'));


module.exports = pool; 