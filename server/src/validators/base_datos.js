const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS APLICACION ***************
const validatorBase = [
    check("base_datos").exists().notEmpty().isString().isLength({min:3, max:100}),
    check("estatus").exists().notEmpty().isString(),
    check("cantidad_usuarios").exists().notEmpty().isString(),
    check("tipo").exists().notEmpty().isString(),
    check("manejador").exists().notEmpty().isString(),
    check("ambiente").exists().notEmpty().isString(),
    check("usuario_registro").exists().notEmpty().isString(),
    check("select_servidor").exists(),

    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){ 
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];

module.exports = { validatorBase };