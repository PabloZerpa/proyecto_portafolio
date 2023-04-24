
const router = require("express").Router();
const { obtenerDatos, obtenerDato, crearAplicacion, actualizarAplicacion, eliminarAplicacion, 
    obtenerBusqueda, obtenerCampo, obtenerPorGraficos, actualizarCampo, obtenerLenguajes,obtenerPlataformas,
    obtenerFrameworks, obtenerBaseDatos, obtenerServidores, obtenerCantidadTotal, 
    general, tecno, basedatos, servidor, responsable, documentacion, obtenerResponsables } = require("../controllers/aplicaciones");
const { auth, authAdmin } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { fallas, registrarFalla, actualizarFalla, buscarFalla } = require("../controllers/fallas");
const { validatorCreateItem, validatorGetItem, validatorApp } = require("../validators/aplicaciones");



// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", auth, obtenerDatos);

// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", auth, obtenerDato);

// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);

// *************** RUTA PARA OBTENER LOS DATOS POR CAMPO *************** 
router.post("/campo", auth, obtenerCampo); 

// *************** RUTA PARA OBTENER CANTIDAD DE REGISTROS *************** 
router.get("/total", auth, obtenerCantidadTotal);





// *************** RUTA REGISTRAR UNA APLICACION *************** 
router.post("/", auth, validatorApp, crearAplicacion);

// *************** RUTA PARA ACTUALIZAR UNA APLICACION *************** 
router.put("/:id", auth, actualizarAplicacion);

// *************** RUTA PARA ACTUALIZAR LOS DATOS POR CAMPO *************** 
router.patch("/:id", auth, actualizarCampo);

// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", auth, eliminarAplicacion);

// *************** RUTA PARA OBTENER LOS DATOS PARA LOS GRAFICOS *************** 
router.post("/grafico", auth, obtenerPorGraficos); 




// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/plataformas", auth, obtenerPlataformas);

// *************** RUTA PARA OBTENER LENGUAJES *************** 
router.get("/lenguajes", auth, obtenerLenguajes);

// *************** RUTA PARA OBTENER FRAMEWORKS *************** 
router.get("/frameworks", auth, obtenerFrameworks);

// *************** RUTA PARA OBTENER BASES DE DATOS *************** 
router.get("/basesdatos", auth, obtenerBaseDatos);

// *************** RUTA PARA OBTENER SERVIDORES *************** 
router.get("/servidores", auth, obtenerServidores);

// *************** RUTA PARA OBTENER RESPONSABLES *************** 
router.get("/responsables", auth, obtenerResponsables);





// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", auth, general);

// *************** RUTA PARA OBTENER INFORMACION TECNOLOGIAS *************** 
router.get("/tecnologia/:id", auth, tecno);

// *************** RUTA PARA OBTENER INFORMACION BASE DE DATOS *************** 
router.get("/basedatos/:id", auth, basedatos);

// *************** RUTA PARA OBTENER INFORMACION SERVIDOR *************** 
router.get("/servidor/:id", auth, servidor);

// *************** RUTA PARA OBTENER INFORMACION RESPONSABLE *************** 
router.get("/responsable/:id", auth, responsable);

// *************** RUTA PARA OBTENER INFORMACION DE LA DOCUMENTACION *************** 
router.get("/documentacion/:id", auth, documentacion); 





// *************** RUTA PARA OBTENER INFORMACION DE LAS FALLAS *************** 
router.get("/fallas/:id", auth, fallas);

// *************** RUTA PARA REGISTRAR FALLA *************** 
router.post("/fallas/", auth, registrarFalla);

// *************** RUTA PARA ACTUALIZAR FALLA *************** 
router.patch("/fallas/:id", auth, actualizarFalla);

// *************** RUTA PARA BUSCAR FALLA *************** 
router.post("/fallas/busqueda", auth, buscarFalla);








// *************** RUTA INACTIVA, ERA PARA TESTEAR LA CONEXION CON DIRECTORIO ACTIVO *************** 
router.post("/ad", autenticarUser, (req, res, next) => {res.send('NICE')});

// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, crearAplicacion);

module.exports = router; 