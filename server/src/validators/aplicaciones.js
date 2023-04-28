
const { check, validationResult } = require("express-validator");

// *************** VALIDAR DATOS APLICACION ***************
const validatorApp = [
    check("apl_acronimo").exists().notEmpty().isString(),
    check("apl_nombre").exists().notEmpty().isString(),
    check("apl_descripcion").exists().notEmpty().isString(),
    check("apl_version").exists().notEmpty().isString(),
    check("apl_estatus").exists().notEmpty().isInt(),
    check("apl_prioridad").exists().notEmpty().isInt(),
    check("apl_critico").exists().notEmpty().isString(),
    check("apl_alcance").exists().notEmpty().isInt(),
    check("apl_codigo_fuente").exists().notEmpty().isString(),
    check("apl_direccion").exists(),
    check("apl_cantidad_usuarios"),
    check("plataforma").exists().notEmpty().isInt(),
    // check("lenguaje1").exists(),
    // check("lenguaje2").exists(),
    // check("lenguaje3").exists(),
    // check("version1").exists(),
    // check("version2").exists(),
    // check("version3").exists(),
    // check("framework1").exists(),
    // check("framework2").exists(),
    // check("framework3").exists(),
    //check("select_base").exists().notEmpty().isString(),
    //check("select_servidor").exists().notEmpty().isString(),
    check("man_frecuencia").exists().notEmpty().isString(),
    check("man_horas_prom").exists(),
    check("man_horas_anuales").exists(),
    check("doc_descripcion").exists().notEmpty().isString(),
    check("doc_tipo").exists().notEmpty().isString(),
    check("doc_direccion").exists().notEmpty().isString(),
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

module.exports = { validatorApp };

