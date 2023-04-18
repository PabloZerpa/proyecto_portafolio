
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../helpers/token');
const { encriptar, comparar } = require('../helpers/encriptar');

// *************** LOGEAR USUARIO ***************
const login = async (req, res) => { 
    try {
        const body = matchedData(req);
        const {indicador, password } = body;
        const query = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [indicador]);
        const user = query[0][0];
        const rol = user.rol;
        
        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(!user){
            console.log('USUARIO NO EXISTE');
            return res.status(401).json({ message: 'USUARIO INCORRECTO' });
        }

        const passwordVerificado = await comparar(password, user.password);
        if (!passwordVerificado) {
            console.log('CONTRASEÑA INCORRECTA');
            return res.status(401).json({ message: 'CONTRASEÑA INCORRECTA' });
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

// *************** CREAR USUARIO ***************
const registrar = async (req, res) => {
  
    const password = await encriptar(req.body.password);
    const datos = {...req.body, password };

    const buscarUsuario = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [datos.indicador]);
    const user = buscarUsuario[0][0];
        
    // ********** VERIFICA QUE EL USUARIO EXISTA **********
    if(user){
        console.log('USUARIO YA EXISTENTE');
        return res.status(401).json({ message: 'USUARIO YA REGISTRADO' });
    }

    const query = await pool.query(
        `INSERT INTO usuarios (indicador, password, rol, gerencia_id) VALUES (?,?,?,?)`, 
            [datos.indicador, datos.password, datos.rol, 1]
    );

    console.log('USUARIO CREADO SATISFACTORIAMENTE');
    res.status(200).json(datos);
 }

module.exports = { login, registrar };