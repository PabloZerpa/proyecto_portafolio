
const { generarLogAuditoria } = require('../helpers/auditoria');


// *************** CERRAR SESION ***************
const logout = (req, res) => {

    const datosAuditoria = {
        mensaje : 'Cerro Sesion',
        ip : req.ip,
        usuario_id : req.usuario_id
    }

    generarLogAuditoria(datosAuditoria);


    console.log('Sesion Cerrada');
};

module.exports = {logout};