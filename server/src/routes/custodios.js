
const { obtenerBusqueda, registrarCustodio, actualizarCustodio, eliminarCustodio, general, aplicacion } = require("../controllers/custodios");
const { auth } = require("../middlewares/auth");
const { validatorCustodio } = require("../validators/custodios");
const router = require("express").Router();


// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);

// *************** RUTA PARA REGISTRAR UN CUSTODIO *************** 
router.post("/", auth, validatorCustodio, registrarCustodio);

// *************** RUTA PARA ACTUALIZAR UN CUSTODIO *************** 
router.patch("/:id", auth, actualizarCustodio);

// *************** RUTA PARA ELIMINAR CUSTODIO *************** 
router.delete("/:id", auth, eliminarCustodio);




// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", auth, general);

// *************** RUTA PARA OBTENER INFORMACION APLICACIONES *************** 
router.get("/aplicacion/:id", auth, aplicacion);



module.exports = router;