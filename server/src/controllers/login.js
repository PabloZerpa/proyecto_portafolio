
const pool = require('../config');
const { matchedData } = require("express-validator");
const { generarToken } = require('../helpers/token');
const { generarLogAuditoria } = require('../helpers/auditoria');

// *************** LOGEAR USUARIO ***************
const login = async (req, res) => { 
    try {
        const body = matchedData(req);
        const {indicador, password} = body;
        
        const buscarUsuario = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [indicador]);
        const usuario = buscarUsuario[0][0];
        let rol = null;

        if(usuario){
            const rolUsuario = await pool.query('SELECT rol FROM roles WHERE rol_id = ?', [usuario.rol_id]);
            rol = rolUsuario[0][0].rol;
        }

        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(!usuario){
            return res.status(401).json({ message: 'USUARIO INCORRECTO' });
        }

        // ********** VERIFICA QUE EL USUARIO POSEA UN ROL **********
        if(!rol){
            return res.status(401).json({ message: 'USUARIO INCORRECTO' });
        }

        if(indicador === 'admin'){
            if(password !== '12345678')
                return res.status(401).json({ message: 'CONTRASEÑA INCORRECTA' });
        }
        

        // ********** GENERA EL TOKEN DEL USUARIO **********
        const token = await generarToken(usuario.usuario_id,indicador,rol);
        const datos = {
            indicador,
            rol,
            token 
        }
        
        const datosAuditoria = {
            mensaje : 'Inicio de sesion exitoso',
            ip : req.ip,
            usuario_id : usuario.usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.status(200).json(datos);
    }
    catch(e){
        return res.status(401).json({ message: 'ERROR AL INICIAR SESION' });
    }
}

// *************** CREAR USUARIO ***************
const registrar = async (req, res) => {
    try {
        const datos = req.body;
        let usuario_id = null;

        const buscarUsuario = await pool.query('SELECT * FROM usuarios WHERE indicador = ?', [datos.indicador]);
        const usuario = buscarUsuario[0][0];
            
        // ********** VERIFICA QUE EL USUARIO EXISTA **********
        if(usuario){
            return res.status(401).json({ message: 'USUARIO YA REGISTRADO' });
        }

        const rows = await pool.query(`SELECT usuario_id FROM usuarios WHERE indicador = ?`, [datos.usuario_registro]);
        usuario_id = rows[0][0].usuario_id;

        await pool.query(
            `INSERT INTO usuarios 
                (indicador, nombre, apellido, rol_id, cargo_id, gerencia_id, 
                usuario_registro, usuario_actualizo)
            VALUES (?,?,?,?,?,?,?,? );`,
            [datos.indicador, datos.nombre, datos.apellido, datos.rol, 
            datos.cargo, datos.gerencia, usuario_id, usuario_id]
        );

        const datosAuditoria = {
            mensaje : `Registro de Usuario ${datos.indicador}`,
            ip : req.ip,
            usuario_id : usuario_id
        }
        generarLogAuditoria(datosAuditoria);

        res.status(200).json(datos);
    } catch (error) {
        return res.status(401).json({ message: 'ERROR AL REGISTRAR USUARIO' });
    }
    
 }

 // *************** CERRAR SESION ***************
const logout = (req, res) => {

    const datosAuditoria = {
        mensaje : 'Cerro Sesion',
        ip : req.ip,
        usuario_id : req.usuario_id
    }

    generarLogAuditoria(datosAuditoria);
};


module.exports = { login, registrar, logout };