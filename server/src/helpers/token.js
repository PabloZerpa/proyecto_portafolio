
const jwt = require("jsonwebtoken");

const generarToken = async (indicador,rol) => {
    return token = jwt.sign({indicador,rol}, 'SECRETO#123', {expiresIn: '4h'});
};

const verificarToken = (authorization) => {

    const decoded = jwt.verify(authorization, 'SECRETO#123');
    const token = decoded;

    return token;
};


module.exports = { generarToken, verificarToken };