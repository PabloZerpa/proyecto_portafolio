
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS USUARIOS ***************
const validatorCreateItem = [
    check("indicador").exists().notEmpty().isString(),
    check("password").exists().notEmpty().isLength({min:8, max:12}),
    check("rol").exists().notEmpty().isString(),
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

// *************** VALIDAR ID DEL USUARIO ***************
const validatorGetItem = [
    check("id").exists().notEmpty().isInt(),
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

module.exports = { validatorCreateItem, validatorGetItem };