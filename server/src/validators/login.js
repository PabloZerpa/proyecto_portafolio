
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS DE LOGIN ***************
const validatorLogin = [
    check("indicador").exists().notEmpty().isString(),
    check("password").exists().notEmpty().isLength({min:8, max:12}),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){
            res.status(403);
            res.send({errors: err.array()})
        }
    }
];

// *************** VALIDAR DATOS DE LOGIN ***************
const validatorRegistro = [
    check("indicador").exists().notEmpty().isString().isLength({min:4, max:10}),
    check("password").exists().notEmpty().isLength({min:8, max:12}),
    check("nombre").exists().notEmpty().isString(),
    check("apellido").exists().notEmpty().isString(),
    // check("rol").exists().notEmpty().isString(),
    // check("cargo").exists().notEmpty().isString(),
    // check("gerencia").exists().notEmpty().isString(),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){
            // res.status(403);
            // res.send({errors: err.array()})
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];

module.exports = { validatorLogin, validatorRegistro };