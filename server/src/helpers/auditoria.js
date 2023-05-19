const pool = require('../config');

const generarLogAuditoria = (datos) => {

    const { ip, mensaje, usuario_id } = datos;

    pool.query(
        `INSERT INTO auditoria (usuario_id, mensaje, ip, fecha) VALUES (?, ?, ?, now() )`, 
        [usuario_id, mensaje, ip]
    );
}
 
module.exports = {
    generarLogAuditoria
}