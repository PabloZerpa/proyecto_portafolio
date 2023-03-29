
const router = require("express").Router();
const { obtenerDatos, obtenerDato, crearAplicacion, actualizarAplicacion, eliminarAplicacion, obtenerPorBusqueda, obtenerPorCampo, obtenerPorGraficos, actualizarCampo } = require("../controllers/aplicaciones");
const { auth, authAdmin } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { validatorCreateItem, validatorGetItem } = require("../validators/aplicaciones");

// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", obtenerDatos);


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/term", obtenerPorBusqueda); 


// *************** RUTA PARA OBTENER LOS DATOS POR CAMPO *************** 
router.post("/campo", obtenerPorCampo); 


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/grafico", obtenerPorGraficos); 


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", auth, obtenerDato);

 
// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.post("/", crearAplicacion);


// *************** RUTA PARA ACTUALIZAR LOS DATOS POR ID *************** 
router.put("/:id", actualizarAplicacion);


// *************** RUTA PARA ACTUALIZAR LOS DATOS POR CAMPO *************** 
router.patch("/:id", actualizarCampo);


// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", eliminarAplicacion);


// *************** RUTA INACTIVA, ERA PARA TESTEAR LA CONEXION CON DIRECTORIO ACTIVO *************** 
router.post("/ad", autenticarUser, (req, res, next) => {res.send('NICE')});


// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, crearAplicacion);

module.exports = router; 