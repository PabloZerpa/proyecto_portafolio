const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS APLICACION ***************
const validatorServidor = [
    check("servidor").exists().notEmpty().isString().isLength({min:3, max:100}),
    check("direccion").exists().notEmpty().isString().isLength({min:0, max:50}),
    check("estatus").exists().notEmpty().isString(),
    check("sistema").exists().notEmpty().isString(),
    check("modelo").exists().notEmpty().isString(),
    check("marca").exists().notEmpty().isString(),
    check("serial").exists().notEmpty().isString(),
    check("memoria").exists().notEmpty().isString(),
    check("velocidad").exists().notEmpty().isString(),
    check("cantidad").notEmpty().isString(),
    check("region").exists().notEmpty().isString(),
    check("localidad").exists().notEmpty().isString(),
    check("usuario_registro").exists().notEmpty().isString(),

    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){ 
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];

module.exports = { validatorServidor };