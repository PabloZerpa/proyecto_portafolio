
const router = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { crearUsuario, cambiarPermisos, cambiarPassword, 
    obtenerUsuarios, obtenerPorBusqueda } = require("../controllers/usuarios");

router.get("/", auth, obtenerUsuarios);

router.post("/busqueda", auth, obtenerPorBusqueda);

router.post("/", auth, crearUsuario);

router.patch("/permisos/:id", auth, cambiarPermisos);

router.patch("/password/:id", auth, cambiarPassword);

module.exports = router;  