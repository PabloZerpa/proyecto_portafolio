
const router = require("express").Router();
const { obtenerDatos, obtenerDato, crearAplicacion, actualizarAplicacion, eliminarAplicacion, 
    obtenerBusqueda, obtenerCampo, obtenerPorGraficos, actualizarCampo, obtenerLenguajes,
    obtenerFrameworks, obtenerBaseDatos, obtenerServidores, obtenerCantidadTotal, general, tecno, basedatos, servidor, responsable, documentacion, fallas, obtenerResponsables } = require("../controllers/aplicaciones");
const { auth, authAdmin } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { validatorCreateItem, validatorGetItem } = require("../validators/aplicaciones");




// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", obtenerDatos);

// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", obtenerDato);

// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/busqueda", obtenerBusqueda);

// *************** RUTA PARA OBTENER LOS DATOS POR CAMPO *************** 
router.post("/campo", obtenerCampo); 

// *************** RUTA PARA OBTENER CANTIDAD DE REGISTROS *************** 
router.get("/total", obtenerCantidadTotal);





// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.post("/", crearAplicacion);

// *************** RUTA PARA ACTUALIZAR LOS DATOS POR ID *************** 
router.put("/:id", actualizarAplicacion);

// *************** RUTA PARA ACTUALIZAR LOS DATOS POR CAMPO *************** 
router.patch("/:id", actualizarCampo);

// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", eliminarAplicacion);

// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/grafico", obtenerPorGraficos); 





// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/lenguajes", obtenerLenguajes);

// *************** RUTA PARA OBTENER FRAMEWORKS *************** 
router.get("/frameworks", obtenerFrameworks);

// *************** RUTA PARA OBTENER BASES DE DATOS *************** 
router.get("/basesdatos", obtenerBaseDatos);

// *************** RUTA PARA OBTENER SERVIDORES *************** 
router.get("/servidores", obtenerServidores);

// *************** RUTA PARA OBTENER SERVIDORES *************** 
router.get("/servidores", obtenerResponsables);





// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", general);

// *************** RUTA PARA OBTENER INFORMACION TECNOLOGIAS *************** 
router.get("/tecnologia/:id", tecno);

// *************** RUTA PARA OBTENER INFORMACION BASE DE DATOS *************** 
router.get("/basedatos/:id", basedatos);

// *************** RUTA PARA OBTENER INFORMACION SERVIDOR *************** 
router.get("/servidor/:id", servidor);

// *************** RUTA PARA OBTENER INFORMACION RESPONSABLE *************** 
router.get("/responsable/:id", responsable);

// *************** RUTA PARA OBTENER INFORMACION RESPONSABLE *************** 
router.get("/documentacion/:id", documentacion); 

// *************** RUTA PARA OBTENER INFORMACION RESPONSABLE *************** 
router.get("/fallas/:id", fallas);

// // *************** RUTA PARA OBTENER INFORMACION FALLAS *************** 
// router.post("/fallas/:id", tecno);








// *************** RUTA INACTIVA, ERA PARA TESTEAR LA CONEXION CON DIRECTORIO ACTIVO *************** 
router.post("/ad", autenticarUser, (req, res, next) => {res.send('NICE')});

// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, crearAplicacion);

module.exports = router; 