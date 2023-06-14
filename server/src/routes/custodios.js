
const { obtenerBusqueda, registrarCustodio, actualizarCustodio, eliminarCustodio, obtenerDatos, registrarCustodio2, buscarCustodio2 } = require("../controllers/custodios");
const { auth } = require("../middlewares/auth");
const { validatorCustodio } = require("../validators/custodios");
const router = require("express").Router();


// *************** RUTA DE PRUEBA *************** 
router.post("/registroPrueba", registrarCustodio2);

router.post("/buscarPrueba", buscarCustodio2);


// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/:id", auth, obtenerDatos);

// *************** RUTA PARA OBTENER INFORMACION POR BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);

// *************** RUTA PARA REGISTRAR UN CUSTODIO *************** 
router.post("/", auth, validatorCustodio, registrarCustodio);

// *************** RUTA PARA ACTUALIZAR UN CUSTODIO *************** 
router.patch("/:id", auth, actualizarCustodio);

// *************** RUTA PARA ELIMINAR CUSTODIO *************** 
router.delete("/:id", auth, eliminarCustodio);



module.exports = router;