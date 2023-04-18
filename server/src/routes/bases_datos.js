const { obtenerDatos, obtenerBusqueda, crearBaseDatos, actualizarBaseDatos, aplicacion, general, servidor, obtenerBaseDatos } = require("../controllers/bases_datos");

const router = require("express").Router();


// *************** RUTA PARA OBTENER INFORMACION GENERAL LAS BASES DE DATOS *************** 
router.get("/", obtenerDatos);

// *************** RUTA PARA OBTENER INFORMACION POR ID DE UNA BASE DE DATOS *************** 
router.get("/:id", obtenerBaseDatos);

// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", obtenerBusqueda);

// *************** RUTA PARA REGISTRAR UNA BASES DE DATOS *************** 
router.post("/", crearBaseDatos);

// *************** RUTA PARA ACTUALIZAR UNA BASES DE DATOS *************** 
router.patch("/:id", actualizarBaseDatos);

// router.delete("/:id", actualizarBaseDatos);


// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", general);

// *************** RUTA PARA OBTENER INFORMACION APLICACIONES *************** 
router.get("/aplicacion/:id", aplicacion);

// *************** RUTA PARA OBTENER INFORMACION SERVIDORES *************** 
router.get("/servidor/:id", servidor);



module.exports = router;