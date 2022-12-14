
const pool = require('../config');
const jwt = require("jsonwebtoken");
const { encrypt, compare } = require("../utils/handlePassword");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleErrors");

const pruebaCtrl = async (req, res) => {
    
}

// *************** REGISTRAR USUARIO ***************
const registerCtrl = async (req, res) => {
    try {
        req = matchedData(req);
        const passwordHash = await encrypt(req.password);
        const body = {...req, password:passwordHash};
        const {name, cedula, email, password} = body;

        try {
            const isEmailExist = await pool.query('SELECT email FROM usuarios WHERE email = ?', [email]);
            const verifyEmail = isEmailExist[0][0].email;
            console.log(verifyEmail);
            if(verifyEmail == email){
                console.log('EMAIL OCUPADO');
                return;
            } 
        } catch (error) {
            console.log('A CRITICAL ERROR HAS BEEN HAPPEND');
        }

        console.log('EMAIL ACEPTADO');
        const dataUser = await pool.query('INSERT INTO usuarios (name, cedula, email, password) VALUES (?,?,?,?)', [name, cedula, email, password]);
        
        const data = {
            token: await jwt.sign(
                {id: dataUser.id, name: dataUser.cedula}, process.env.JWT_SECRET, {expiresIn: "2h"}),
            user: dataUser,
        }
        
        res.send({data});
    } catch (error) {
        handleHttpError(res,"REGISTER_ERROR");
    }
}

// *************** LOGEAR USUARIO ***************
const loginCtrl = async (req, res) => {
    try {
        const body = matchedData(req);
        const {cedula} = body;
        const dataUser = await pool.query('SELECT * FROM usuarios WHERE cedula = ?', [cedula]);
        const user = dataUser[0];
        
        if(!user){
            handleHttpError(res,"ERROR_USER_NOT_FOUND");
            return; 
        }

        const hashPassword = user[0].password;
        const check = await compare(body.password, hashPassword);

        if(!check){
            handleHttpError(res,"ERROR_PASSWORD_INVALID");
            return;
        }

        const token = await jwt.sign({id: user.id,name: user.cedula}, process.env.JWT_SECRET, {expiresIn: "2h"});
        const data = {
            token: token,
            user: user
        }

        // res.header('auth-token', tokenJwt).json({
        //     error: null,
        //     data: {tokenJwt}
        // })
        console.log(token)
        res.status(200).json({token});

    } catch (error) {
        handleHttpError(res,"LOGIN_ERROR");
    }
}

module.exports = { registerCtrl, loginCtrl, pruebaCtrl };