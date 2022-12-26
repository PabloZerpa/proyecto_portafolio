
// *************** CERRAR SESION ***************
const logout = (req, res) => {
    req.session.destroy();
    console.log('Sesion Cerrada');
};

module.exports = {logout};