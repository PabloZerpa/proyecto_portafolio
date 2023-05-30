const pool = require('../config');

const generarLogAuditoria = async (datos) => {

    const { ip, mensaje, usuario_id } = datos;

    await pool.query(
        `INSERT INTO auditoria (usuario_id, mensaje, ip, fecha) VALUES (?, ?, ?, now() )`, 
        [usuario_id, mensaje, ip]
    );
}
 
module.exports = {
    generarLogAuditoria
}