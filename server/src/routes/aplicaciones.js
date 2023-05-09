
const router = require("express").Router();
const { obtenerDatos, obtenerDato, registrarAplicacion, actualizarAplicacion, eliminarAplicacion, 
    obtenerBusqueda, obtenerLenguajes,obtenerPlataformas,obtenerFrameworks, obtenerBaseDatos, 
    obtenerServidores,general, tecno, basedatos, servidor, 
    documentacion, custodio, obtenerCustodios } = require("../controllers/aplicaciones");
const { auth } = require("../middlewares/auth");
const { fallas, registrarFalla, actualizarFalla, buscarFalla } = require("../controllers/fallas");
const { validatorApp } = require("../validators/aplicaciones");

/* 
    ***********************************                             ***********************************
    *********************************** CREATE-READ-UPDATE-DELETE   ***********************************
    ***********************************                             ***********************************
*/

// *************** RUTA REGISTRAR UNA APLICACION *************** 
router.post("/", auth, validatorApp, registrarAplicacion);


// *************** RUTA PARA ACTUALIZAR UNA APLICACION *************** 
router.put("/:id", auth, actualizarAplicacion);


// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", auth, obtenerDatos);


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", auth, obtenerDato);


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);


// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", auth, eliminarAplicacion);



/* 
    ***********************************                             ***********************************
    *********************************** LISTA DE DATOS PARA SELECTS ***********************************
    ***********************************                             ***********************************
*/

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
router.get("/custodios", auth, obtenerCustodios);


/* 
    ***********************************                        ***********************************
    *********************************** INFORMACION PARA VISTA ***********************************
    ***********************************                        ***********************************
*/

// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", auth, general);

// *************** RUTA PARA OBTENER INFORMACION TECNOLOGIAS *************** 
router.get("/tecnologia/:id", auth, tecno);

// *************** RUTA PARA OBTENER INFORMACION BASE DE DATOS *************** 
router.get("/basedatos/:id", auth, basedatos);

// *************** RUTA PARA OBTENER INFORMACION SERVIDOR *************** 
router.get("/servidor/:id", auth, servidor);

// *************** RUTA PARA OBTENER INFORMACION RESPONSABLE *************** 
router.get("/custodio/:id", auth, custodio);

// *************** RUTA PARA OBTENER INFORMACION DE LA DOCUMENTACION *************** 
router.get("/documentacion/:id", auth, documentacion); 



/* 
    ***********************************          ***********************************
    *********************************** FALLAS   ***********************************
    ***********************************          ***********************************
*/

// *************** RUTA PARA OBTENER INFORMACION DE LAS FALLAS *************** 
router.get("/fallas/:id", auth, fallas);

// *************** RUTA PARA REGISTRAR FALLA *************** 
router.post("/fallas/", auth, registrarFalla);

// *************** RUTA PARA ACTUALIZAR FALLA *************** 
router.patch("/fallas/:id", auth, actualizarFalla);

// *************** RUTA PARA BUSCAR FALLA *************** 
router.post("/fallas/busqueda", auth, buscarFalla);







// // *************** RUTA PARA OBTENER CANTIDAD DE REGISTROS *************** 
// router.get("/total", auth, obtenerCantidadTotal);
// // *************** RUTA PARA OBTENER LOS DATOS PARA LOS GRAFICOS *************** 
// router.post("/grafico", auth, obtenerPorGraficos); 





module.exports = router; 