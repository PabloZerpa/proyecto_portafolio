
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../helpers/token');
const { encriptar, comparar } = require('../helpers/encriptar');

const { generarLogAuditoria } = require('../helpers/auditoria');

// *************** LOGEAR USUARIO ***************
const login = async (req, res) => { 
    try {
        const body = matchedData(req);
        const {indicador, password} = body;
        
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
        
        const consulta = await pool.query('SELECT TIMESTAMPDIFF(DAY, (SELECT exp_password FROM usuarios WHERE indicador = ?), now()) AS dias_transcurridos;', [indicador]);
        let exp = consulta[0][0].dias_transcurridos;

        if(exp === null || exp >= 180)
            exp = true;
        else
            exp = false;

        // ********** GENERA EL TOKEN DEL USUARIO **********
        const token = await generarToken(user.usuario_id,indicador,rol);
        const datos = {
            indicador,
            rol,
            exp,
            token 
        }
        
        const datosAuditoria = {
            mensaje : 'Inicio de sesion exitoso',
            ip : req.ip,
            usuario_id : user.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

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

        if(datos.indicador === 'admin'){
            const query = await pool.query(
                `INSERT INTO usuarios 
                    (indicador, password, nombre, apellido, rol_id, cargo_id, gerencia_id, exp_password)
                VALUES (?,?,?,?,?,?,?, now() );`,
                [datos.indicador, datos.password, datos.nombre, 
                datos.apellido, datos.rol, datos.cargo, datos.gerencia]
            );
        }
        else{
            const rows = await pool.query(`SELECT usuario_id FROM usuarios WHERE indicador = ?`, [datos.usuario_registro]);
            const usuario_id = rows[0][0].usuario_id;

            const query = await pool.query(
                `INSERT INTO usuarios 
                    (indicador, password, nombre, apellido, rol_id, cargo_id, gerencia_id, 
                    usuario_registro, usuario_actualizo)
                VALUES (?,?,?,?,?,?,?,?,? );`,
                [datos.indicador, datos.password, datos.nombre, datos.apellido, datos.rol, 
                datos.cargo, datos.gerencia, usuario_id, usuario_id]
            );
        }

        const datosAuditoria = {
            mensaje : `Registro de Usuario ${datos.indicador}`,
            ip : req.ip,
            usuario_id : req.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.status(200).json(datos);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL REGISTRAR USUARIO' });
    }
    
 }


module.exports = { login, registrar };