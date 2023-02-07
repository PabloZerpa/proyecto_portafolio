
const router = require("express").Router();
const { getItems, getItem, createItems, updateItems, deleteItems, getByUpdateDate, getByCreateDate, getByTerm } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { validatorCreateItem, validatorGetItem } = require("../validators/user");

// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", auth, getItems);


// *************** RUTA PARA OBTENER LOS ULTIMOS DATOS ACTUALIZADOS *************** 
router.get("/ultimosModificados", auth, getByUpdateDate);


// *************** RUTA PARA OBTENER LOS ULTIMOS DATOS AGREGADOS *************** 
router.get("/ultimosAgregados", auth, getByCreateDate);


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/term", getByTerm); 


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", auth, getItem);

// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.post("/", auth, createItems);

// *************** RUTA PARA ACTUALIZAR LOS DATOS POR ID *************** 
router.put("/:id", auth, updateItems);


// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", deleteItems);


// *************** RUTA INACTIVA, ERA PARA TESTEAR LA CONEXION CON DIRECTORIO ACTIVO *************** 
router.post("/ad", autenticarUser, (req, res, next) => {res.send('NICE')});


// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, createItems);

module.exports = router; 