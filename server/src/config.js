
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

pool.getConnection(function (err, conn) {
    if(err) throw err;
    else console.log("Conexion a la base de datos exitosa");
}) 

module.exports = pool; 