
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS CUSTODIO ***************
const validatorCustodio = [
    check("nombre").exists().notEmpty().isString().isLength({min:3, max:15}),
    check("apellido").exists().notEmpty().isString().isLength({min:3, max:15}),
    check("indicador").exists().notEmpty().isString().isLength({min:4, max:10}),
    check("cedula").exists().notEmpty().isString().isLength({min:5, max:10}),
    check("telefono").exists().notEmpty().isString(),
    check("cargo").exists().notEmpty().isString(),
    check("gerencia").exists().notEmpty().isString(),
    check("region").exists().notEmpty().isString(),
    check("localidad").exists().notEmpty().isString(),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){ 
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];


module.exports = { validatorCustodio };
