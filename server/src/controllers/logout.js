
const { generarLogAuditoria } = require('../helpers/auditoria');


// *************** CERRAR SESION ***************
const logout = (req, res) => {

    const payload = {
        mensaje : 'Cerro la session',
        ip : req.ip,
        indicador : 'prueba'
    }

    generarLogAuditoria(payload);


    console.log('Sesion Cerrada');
};

module.exports = {logout};