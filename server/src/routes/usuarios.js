
const router = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { cambiarPermisos, 
    obtenerUsuarios, obtenerPorBusqueda, eliminarUsuario, 
    obtenerLocalidades, obtenerCantidadRegiones, obtenerActividad, 
    obtenerValores } = require("../controllers/usuarios");

    
router.get("/:id", auth, obtenerValores);

router.post("/localidades", auth, obtenerLocalidades);

router.post("/cantidadRegiones", auth, obtenerCantidadRegiones);



router.get("/", auth, obtenerUsuarios);

router.post("/busqueda", auth, obtenerPorBusqueda);

router.get("/actividad/:id", auth, obtenerActividad);

router.patch("/permisos/:id", auth, cambiarPermisos);

router.delete("/eliminar/:id", auth, eliminarUsuario);

module.exports = router;  