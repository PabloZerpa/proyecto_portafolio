const pool = require('../config');

const generarLogAuditoria = (payload) => {

    const { ip, mensaje, indicador } = payload;
    console.log(payload);

    // pool.query(
    //     `INSERT INTO auditoria (indicador, mensaje, ip) VALUES (?, ?, ?)`, 
    //     [indicador, mensaje, ip]
    // );

    pool.query(
        `INSERT INTO auditoria (indicador, mensaje, ip, fecha) VALUES (?, ?, ?, now() )`, 
        [indicador, mensaje, ip]
    );
}
 
module.exports = {
    generarLogAuditoria
}