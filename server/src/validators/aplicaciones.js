
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS APLICACION ***************
const validatorApp = [
    check("apl_acronimo").exists().notEmpty().isString().isLength({min:3, max:10}),
    check("apl_nombre").exists().notEmpty().isString().isLength({min:3, max:100}),
    check("apl_descripcion").exists().notEmpty().isString(),
    check("apl_version").exists().notEmpty().isString().isLength({min:1, max:10}),
    check("apl_estatus").exists().notEmpty().isInt(),
    check("apl_prioridad").exists().notEmpty().isInt(),
    check("apl_alcance").exists().notEmpty().isInt(),
    check("apl_critico").exists().notEmpty().isString().isLength({max:2}),
    check("apl_codigo_fuente").exists().notEmpty().isString().isLength({max:2}),
    check("apl_direccion").exists().notEmpty().isString().isLength({min:0, max:50}),
    check("apl_cantidad_usuarios").notEmpty().isInt(),
    check("plataforma").exists().notEmpty().isInt(),
    check("man_frecuencia").exists().notEmpty().isString(),
    
    check("select_lenguaje").exists().notEmpty().isLength({min:1}),
    check("select_base").exists(),
    check("select_servidor").exists(),
    check("select_documentos").exists(),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){ 
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];


// *************** VALIDAR DATOS FALLA ***************
const validatorFalla = [
    check("aplicacion").exists().notEmpty().isString(),
    check("impacto").exists().notEmpty().isString().isLength({max:10}),
    check("descripcion").exists().notEmpty().isString(),
    check("solucion").exists().notEmpty().isString(),
    check("usuario_creador").exists().notEmpty().isString(),
    (req,res,next) => {
        try{
            validationResult(req).throw();
            return next();
        } catch(err){ 
            return res.status(401).json({ message: 'DATOS INCOMPLETOS' });
        }
    }
];

module.exports = { validatorApp, validatorFalla };

