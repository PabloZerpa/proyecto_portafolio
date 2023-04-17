
const router = require("express").Router();
const { autenticarUser } = require("../middlewares/ad");
const { crearUsuario, cambiarPermisos, cambiarPassword, obtenerUsuarios, obtenerPorBusqueda } = require("../controllers/usuarios");

router.get("/", obtenerUsuarios);

router.post("/busqueda", obtenerPorBusqueda);

router.post("/", crearUsuario);

router.patch("/permisos/:id", cambiarPermisos);

router.patch("/password/:id", cambiarPassword);

module.exports = router;  