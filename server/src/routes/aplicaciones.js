
const router = require("express").Router();
const { obtenerDatos, obtenerDato, crearAplicacion, actualizarAplicacion, eliminarAplicacion, 
    obtenerBusqueda, obtenerCampo, obtenerPorGraficos, actualizarCampo, obtenerLenguajes,
    obtenerFrameworks, obtenerBaseDatos, obtenerServidores, obtenerCantidadTotal, general, tecno, basedatos, servidor, responsable, documentacion, fallas, obtenerResponsables, registrarFalla, buscarFalla, actualizarFalla } = require("../controllers/aplicaciones");
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





// *************** RUTA REGISTRAR UNA APLICACION *************** 
router.post("/", crearAplicacion);

// *************** RUTA PARA ACTUALIZAR UNA APLICACION *************** 
router.put("/:id", actualizarAplicacion);

// *************** RUTA PARA ACTUALIZAR LOS DATOS POR CAMPO *************** 
router.patch("/:id", actualizarCampo);

// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", eliminarAplicacion);

// *************** RUTA PARA OBTENER LOS DATOS PARA LOS GRAFICOS *************** 
router.post("/grafico", obtenerPorGraficos); 





// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/lenguajes", obtenerLenguajes);

// *************** RUTA PARA OBTENER FRAMEWORKS *************** 
router.get("/frameworks", obtenerFrameworks);

// *************** RUTA PARA OBTENER BASES DE DATOS *************** 
router.get("/basesdatos", obtenerBaseDatos);

// *************** RUTA PARA OBTENER SERVIDORES *************** 
router.get("/servidores", obtenerServidores);

// *************** RUTA PARA OBTENER RESPONSABLES *************** 
router.get("/responsables", obtenerResponsables);





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

// *************** RUTA PARA OBTENER INFORMACION DE LA DOCUMENTACION *************** 
router.get("/documentacion/:id", documentacion); 





// *************** RUTA PARA OBTENER INFORMACION DE LAS FALLAS *************** 
router.get("/fallas/:id", fallas);

// *************** RUTA PARA REGISTRAR FALLA *************** 
router.post("/fallas/", registrarFalla);

// *************** RUTA PARA ACTUALIZAR FALLA *************** 
router.patch("/fallas/:id", actualizarFalla);

// *************** RUTA PARA BUSCAR FALLA *************** 
router.post("/fallas/busqueda", buscarFalla);








// *************** RUTA INACTIVA, ERA PARA TESTEAR LA CONEXION CON DIRECTORIO ACTIVO *************** 
router.post("/ad", autenticarUser, (req, res, next) => {res.send('NICE')});

// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, crearAplicacion);

module.exports = router; 