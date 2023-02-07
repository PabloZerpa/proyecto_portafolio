
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../helpers/token');

// *************** LOGEAR USUARIO ***************
const login = async (req, res) => { 
    try {
        const body = matchedData(req);
        const {indicador, password, rol} = body;
        const query = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [indicador]);
        const user = query[0][0];
        
        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(!user){
            console.log('USUARIO NO EXISTE');
            return res.status(401).json({ message: 'USUARIO INCORRECTO' });
        }

        // ********** VERIFICA QUE LA CONTRASEÑA SEA CORRECTA **********
        if(password != user.password){
            console.log('CONTRASEÑA INCORRECTA');
            return res.status(401).json({ message: 'CONTRASEÑA INCORRECTA' });
        }

        // ********** VERIFICA QUE EN ROL SEA CORRECTO **********
        if(rol != user.rol){
            console.log('ROL INCORRECTO');
            return res.status(401).json({ message: 'ROL INCORRECTO' });
        }

        // ********** GENERA EL TOKEN DEL USUARIO **********
        const token = await generarToken(indicador,rol);
        
        const datos = {
            indicador,
            rol,
            token
        }

        console.log('LOGIN COMPLETADO');
        console.log(datos);
        console.log('Token: ' + token);
        res.status(200).json(datos);

    }
    catch(e){
        return res.status(401).json(e);
    }
}

module.exports = { login };