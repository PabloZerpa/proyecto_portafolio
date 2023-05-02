const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS APLICACION ***************
const validatorResponsable = [
    check("nombre").exists().notEmpty().isString(),
    check("apellido").exists().notEmpty().isString(),
    check("indicador").exists().notEmpty().isString(),
    check("cedula").exists().notEmpty().isString(),
    check("telefono").exists().notEmpty().isString(),
    check("cargo").exists().notEmpty().isInt(),
    check("gerencia").exists().notEmpty().isInt(),
    check("region").exists().notEmpty().isInt(),
    check("localidad").exists().notEmpty().isInt(),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){ 
            console.log('hola');
            // res.status(403);
            // res.send({errors: err.array()})
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];

module.exports = { validatorResponsable };
