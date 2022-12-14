
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS DEL REGISTRO ***************
const validatorRegister = [
    check("name").exists().notEmpty().isLength({min:3, max:20}),
    check("cedula").exists().notEmpty().isNumeric(),
    check("email").exists().notEmpty().isEmail().normalizeEmail(),
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
const validatorLogin = [
    check("cedula").exists().notEmpty().isNumeric(),
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

module.exports = { validatorRegister, validatorLogin };