
const { obtenerBusqueda, registrarCustodio, actualizarCustodio, eliminarCustodio, obtenerDatos, registrarCustodio2, eliminarCustodio2, obtenerDatos2, actualizarCustodio2, obtenerBusqueda2 } = require("../controllers/custodios");
const { auth } = require("../middlewares/auth");
const { validatorCustodio } = require("../validators/custodios");
const router = require("express").Router();


// *************** RUTA DE PRUEBA *************** 
router.post("/registroPrueba", registrarCustodio2);

router.post("/buscarPrueba");


// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/:id", auth, obtenerDatos2);

// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda2);

// *************** RUTA PARA REGISTRAR UN CUSTODIO *************** 
router.post("/", auth, validatorCustodio, registrarCustodio2);

// *************** RUTA PARA ACTUALIZAR UN CUSTODIO *************** 
router.patch("/:id", auth, actualizarCustodio2);

// *************** RUTA PARA ELIMINAR CUSTODIO *************** 
router.delete("/:id", auth, eliminarCustodio2);



module.exports = router;