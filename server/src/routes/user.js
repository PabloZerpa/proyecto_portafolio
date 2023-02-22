
const router = require("express").Router();
const { getItems, getItem, createItems, updateItems, deleteItems, getByTerm, getByCampo, getByGrafico, updateByCampo } = require("../controllers/user");
const { auth, authAdmin } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { validatorCreateItem, validatorGetItem } = require("../validators/user");

// *************** RUTA PARA OBTENER TODOS LOS DATOS *************** 
router.get("/", getItems);


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/term", getByTerm); 


// *************** RUTA PARA OBTENER LOS DATOS POR CAMPO *************** 
router.post("/campo", getByCampo); 


// *************** RUTA PARA OBTENER LOS DATOS POR TERMINO DE BUSQUEDA *************** 
router.post("/grafico", getByGrafico); 


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.get("/:id", auth, getItem);


// *************** RUTA PARA OBTENER LOS DATOS POR ID *************** 
router.post("/", createItems);


// *************** RUTA PARA ACTUALIZAR LOS DATOS POR ID *************** 
router.put("/:id", authAdmin, updateItems);

// *************** RUTA PARA ACTUALIZAR LOS DATOS POR ID *************** 
router.patch("/:id", authAdmin, updateByCampo);


// *************** RUTA PARA ELIMINAR DATOS POR ID *************** 
router.delete("/:id", deleteItems);


// *************** RUTA INACTIVA, ERA PARA TESTEAR LA CONEXION CON DIRECTORIO ACTIVO *************** 
router.post("/ad", autenticarUser, (req, res, next) => {res.send('NICE')});


// *************** RUTA INACTIVA, ERA PARA CREAR DATOS POR SERVIDOR *************** 
// router.post("/", validatorCreateItem, createItems);

module.exports = router; 