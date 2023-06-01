
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS DE LOGIN ***************
const validatorLogin = [
    check("indicador").exists().notEmpty().isString().isLength({min:4, max:10}),
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
    //check("password").exists().notEmpty().isLength({min:8, max:12}),
    check("nombre").exists().notEmpty().isString().isLength({min:3, max:20}),
    check("apellido").exists().notEmpty().isString().isLength({min:3, max:20}),
    check("rol").exists().notEmpty().isInt(),
    check("cargo").exists().notEmpty().isInt(),
    check("gerencia").exists().notEmpty().isInt(),
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