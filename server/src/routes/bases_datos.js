const { obtenerDatos, obtenerBusqueda, crearBaseDatos, actualizarBaseDatos, aplicacion, general, servidor } = require("../controllers/bases_datos");

const router = require("express").Router();



router.get("/", obtenerDatos);

// router.get("/:id", obtenerBaseDatos);

router.post("/busqueda", obtenerBusqueda);

router.post("/", crearBaseDatos);

router.put("/:id", actualizarBaseDatos);

// router.delete("/:id", actualizarBaseDatos);


// *************** RUTA PARA OBTENER INFORMACION GENERAL *************** 
router.get("/general/:id", general);

// *************** RUTA PARA OBTENER INFORMACION APLICACIONES *************** 
router.get("/aplicacion/:id", aplicacion);

// *************** RUTA PARA OBTENER INFORMACION SERVIDORES *************** 
router.get("/servidor/:id", servidor);



module.exports = router;