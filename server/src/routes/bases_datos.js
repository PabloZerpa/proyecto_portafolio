
const { obtenerDatos, obtenerBusqueda, registrarBaseDatos, actualizarBaseDatos,  
    obtenerBaseDatos, 
    eliminarBaseDatos,
    obtenerManejadores} = require("../controllers/bases_datos");
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
router.post("/", auth, validatorBase, registrarBaseDatos);

// *************** RUTA PARA ACTUALIZAR UNA BASES DE DATOS *************** 
router.patch("/:id", auth, actualizarBaseDatos);

// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", auth, eliminarBaseDatos);

// *************** RUTA PARA OBTENER MANEJADORES *************** 
router.post("/manejadores", auth, obtenerManejadores);


module.exports = router;