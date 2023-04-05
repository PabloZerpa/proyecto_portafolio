
const router = require("express").Router();
const { obtenerDatos, obtenerDato, crearAplicacion, actualizarAplicacion, eliminarAplicacion, 
    obtenerBusqueda, obtenerCampo, obtenerPorGraficos, actualizarCampo, obtenerLenguajes,
    obtenerFrameworks, obtenerBaseDatos, obtenerServidores, obtenerCantidadTotal } = require("../controllers/aplicaciones");
const { auth, authAdmin } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { validatorCreateItem, validatorGetItem } = require("../validators/aplicaciones");

// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/lenguajes", obtenerLenguajes);

// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/frameworks", obtenerFrameworks);

// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/basesdatos", obtenerBaseDatos);

// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/servidores", obtenerServidores);

// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/total", obtenerCantidadTotal);



// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", obtenerDatos);


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", obtenerDato);


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/busqueda", obtenerBusqueda);


// *************** RUTA PARA OBTENER LOS DATOS POR CAMPO *************** 
router.post("/campo", obtenerCampo); 

 
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


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/grafico", obtenerPorGraficos); 

// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, crearAplicacion);

module.exports = router; 