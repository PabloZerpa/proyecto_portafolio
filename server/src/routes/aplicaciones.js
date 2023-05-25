
const router = require("express").Router();
const { obtenerDatos, registrarAplicacion, actualizarAplicacion, eliminarAplicacion, 
    obtenerBusqueda,general, tecno, basedatos, servidor, 
    documentacion, custodio} = require("../controllers/aplicaciones");
    const { fallas, registrarFalla, actualizarFalla, buscarFalla, eliminarFalla } = require("../controllers/fallas");
const { auth } = require("../middlewares/auth");
const { validatorApp, validatorFalla } = require("../validators/aplicaciones");

/* 
    *********************************** CREATE-READ-UPDATE-DELETE   ***********************************
*/

// *************** RUTA REGISTRAR UNA APLICACION *************** 
router.post("/", auth, validatorApp, registrarAplicacion);


// *************** RUTA PARA ACTUALIZAR UNA APLICACION *************** 
router.put("/:id", auth, actualizarAplicacion);


// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", auth, obtenerDatos);


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", auth, general);


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/busqueda", auth, obtenerBusqueda);


// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", auth, eliminarAplicacion);


/* 
    *********************************** INFORMACION PARA VISTA ***********************************
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
    *********************************** FALLAS   ***********************************
*/

// *************** RUTA PARA OBTENER INFORMACION DE LAS FALLAS *************** 
router.get("/fallas/:id", auth, fallas);

// *************** RUTA PARA REGISTRAR FALLA *************** 
router.post("/fallas/", validatorFalla, auth, registrarFalla);

// *************** RUTA PARA ACTUALIZAR FALLA *************** 
router.patch("/fallas/:id", auth, actualizarFalla);

// *************** RUTA PARA BUSCAR FALLA *************** 
router.post("/fallas/busqueda", auth, buscarFalla);

// *************** RUTA PARA BUSCAR FALLA *************** 
router.delete("/fallas/:id", auth, eliminarFalla);


module.exports = router; 