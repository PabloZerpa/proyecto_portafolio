
const jwt = require("jsonwebtoken");

const generarToken = async (usuario_id,indicador,rol) => {
    return token = jwt.sign({usuario_id,indicador,rol}, 'SECRETO#123', {expiresIn: '4h'});
};

const verificarToken = (authorization) => {
    const decoded = jwt.verify(authorization, 'SECRETO#123');
    const token = decoded;

    return token;
};


module.exports = { generarToken, verificarToken };