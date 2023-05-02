
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
    check("apl_direccion").exists().notEmpty().isString(),
    check("apl_cantidad_usuarios").notEmpty().isInt(),
    check("plataforma").exists().notEmpty().isInt(),
    check("man_frecuencia").exists().notEmpty().isString(),
    check("man_horas_prom").exists().notEmpty().isInt(),
    check("man_horas_anuales").exists().notEmpty().isInt(),
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

module.exports = { validatorApp, validatorResponsable };

