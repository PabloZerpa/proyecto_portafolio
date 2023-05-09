
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
        let rol = null;

        if(user){
            const query2 = await pool.query('SELECT rol FROM roles WHERE rol_id = ?', [user.rol_id]);
            rol = query2[0][0].rol;
        }

        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(!user){
            return res.status(401).json({ message: 'USUARIO INCORRECTO' });
        }

        // ********** VERIFICA QUE EL USUARIO POSEA UN ROL **********
        if(!rol){
            return res.status(401).json({ message: 'USUARIO INCORRECTO' });
        }

        // ********** VERIFICA LA CONTRASEÑA **********
        const passwordVerificado = await comparar(password, user.password);
        if (!passwordVerificado) {
            return res.status(401).json({ message: 'CONTRASEÑA INCORRECTA' });
        }

        // ********** GENERA EL TOKEN DEL USUARIO **********
        const token = await generarToken(indicador,rol);
        const datos = {
            indicador,
            rol,
            token 
        }

        // console.log(datos);
        // console.log('Token: ' + token);
        res.status(200).json(datos);

    }
    catch(e){
        return res.status(401).json(e);
    }
}

// *************** CREAR USUARIO ***************
const registrar = async (req, res) => {
    try {
        const password = await encriptar(req.body.password);
        const datos = {...req.body, password };
        
        const buscarUsuario = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [datos.indicador]);
        const user = buscarUsuario[0][0];
            
        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(user){
            return res.status(401).json({ message: 'USUARIO YA REGISTRADO' });
        }

        const query = await pool.query(
            `INSERT INTO usuarios 
                (indicador, password, nombre, apellido, rol_id, cargo_id, gerencia_id) 
            VALUES (?,?,?,?,?,?,?);`, 
            [datos.indicador, datos.password, datos.nombre, datos.apellido, datos.rol, datos.cargo, datos.gerencia]
        );

        res.status(200).json(datos);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL REGISTRAR USUARIO' });
    }
    
 }


// *************** OBTENER USUARIO ***************
const obtenerTotal = async (req,res) => {
    try{
        const data = await pool.query(`
            SELECT usuario_id FROM usuarios`);
        res.send(data[0]);
    }
    catch (error) {
        return res.status(401).json({ message: 'ERROR' });
    }
 }


module.exports = { login, registrar, obtenerTotal };