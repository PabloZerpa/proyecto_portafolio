
const { obtenerDatos, obtenerBusqueda, crearBaseDatos, actualizarBaseDatos, aplicacion, 
    general, servidor, obtenerBaseDatos } = require("../controllers/bases_datos");
const { auth, authAdmin } = require("../middlewares/auth");
const { validatorBase } = require("../validators/base_datos");

const router = require("express").Router();


// *************** RUTA PARA OBTENER INFORMACION GENERAL LAS BASES DE DATOS *************** 
router.get("/", auth, obtenerDatos);

// *************** RUTA PARA OBTENER INFORMACION POR ID DE UNA BASE DE DATOS *************** 
router.get("/:id", auth, obtenerBaseDatos);

// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);

// *************** RUTA PARA REGISTRAR UNA BASES DE DATOS *************** 
router.post("/", auth, validatorBase, crearBaseDatos);

// *************** RUTA PARA ACTUALIZAR UNA BASES DE DATOS *************** 
router.patch("/:id", auth, actualizarBaseDatos);

// router.delete("/:id", actualizarBaseDatos);


// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", auth, general);

// *************** RUTA PARA OBTENER INFORMACION APLICACIONES *************** 
router.get("/aplicacion/:id", auth, aplicacion);

// *************** RUTA PARA OBTENER INFORMACION SERVIDORES *************** 
router.get("/servidor/:id", auth, servidor);



module.exports = router;