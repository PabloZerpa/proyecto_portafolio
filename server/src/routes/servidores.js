

const { registrarServidor, actualizarServidor, obtenerBusqueda, obtenerServidor, eliminarServidor } = require("../controllers/servidores");
const { auth, authAdmin } = require("../middlewares/auth");
const { validatorServidor } = require("../validators/servidores");

const router = require("express").Router();


// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/:id", auth, obtenerServidor);

// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);

// *************** RUTA PARA REGISTRAR UNA BASES DE DATOS *************** 
router.post("/", auth, validatorServidor, registrarServidor);

// *************** RUTA PARA ACTUALIZAR UNA BASES DE DATOS *************** 
router.patch("/:id", auth, actualizarServidor);

// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", auth, eliminarServidor);



module.exports = router;