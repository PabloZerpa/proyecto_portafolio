

const { registrarServidor, actualizarServidor, obtenerBusqueda, basedatos, aplicacion, general } = require("../controllers/servidores");
const { auth, authAdmin } = require("../middlewares/auth");

const router = require("express").Router();



// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);

// *************** RUTA PARA REGISTRAR UNA BASES DE DATOS *************** 
router.post("/", auth, registrarServidor);

// *************** RUTA PARA ACTUALIZAR UNA BASES DE DATOS *************** 
router.patch("/:id", auth, actualizarServidor);

// router.delete("/:id", actualizarBaseDatos);




// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", auth, general);

// *************** RUTA PARA OBTENER INFORMACION APLICACIONES *************** 
router.get("/aplicacion/:id", auth, aplicacion);

// *************** RUTA PARA OBTENER INFORMACION SERVIDORES *************** 
router.get("/basedatos/:id", auth, basedatos);


module.exports = router;