
const pool = require('../config');
const jwt = require('jsonwebtoken');

const generarToken = async (indicador) => {

    return token = jwt.sign({indicador}, 'SECRETO#123', {expiresIn: '1h'});

  };

// *************** VERIFICAR EL TOKEN PARA EL LOGIN ***************
const verificarToken = async (authorization) => {
    try{
        const tokenData = jwt.verify(authorization, 'SECRETO#123');
        const query = await pool.query('SELECT id, indicador, rol FROM usuarios WHERE indicador = ?', [tokenData.indicador]);
        const user = query[0][0];

        return user;

    }catch(e){
        return console.error(e);
    }
};
  
module.exports = { generarToken, verificarToken };