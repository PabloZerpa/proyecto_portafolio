
const router = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { cambiarPermisos, 
    obtenerUsuarios, obtenerPorBusqueda, eliminarUsuario, 
    obtenerLocalidades, obtenerCantidadCategoria, obtenerActividad, 
    obtenerValores } = require("../controllers/usuarios");

    
router.get("/:id", auth, obtenerValores);

router.post("/localidades", auth, obtenerLocalidades);

router.post("/cantidadCategorias", auth, obtenerCantidadCategoria);



router.get("/", auth, obtenerUsuarios);

router.post("/busqueda", auth, obtenerPorBusqueda);

router.get("/actividad/:id", auth, obtenerActividad);

router.patch("/:id", auth, cambiarPermisos);

router.delete("/:id", auth, eliminarUsuario);

module.exports = router;  