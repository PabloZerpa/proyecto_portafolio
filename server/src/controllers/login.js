
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../middlewares/token');

// *************** LOGEAR USUARIO ***************
const login = async (req, res) => { 
    try {
        const body = matchedData(req);
        const {indicador, password, rol} = body;
        // const query = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [indicador]);
        // const user = query[0][0];
        const user = {indicador, password, rol};
        
        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(!user){
            console.log('USUARIO NO EXISTE');
            return;
        }

        // ********** VERIFICA QUE LA CONTRASEÑA SEA CORRECTA **********
        if(password != user.password){
            console.log('CONTRASEÑA INCORRECTA');
            return;
        }

        // ********** VERIFICA QUE EN ROL SEA CORRECTO **********
        if(rol != user.rol){
            console.log('ROL INCORRECTO');
            return;
        }

        // ********** GENERA EL TOKEN DEL USUARIO **********
        const token = await generarToken(indicador);
        
        const datos = {
            indicador,
            rol,
            token
        }

        res.send(datos);

    }
    catch(e){
        return console.error(e);
    }
}

module.exports = { login };