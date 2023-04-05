
const router = require("express").Router();
const { autenticarUser } = require("../middlewares/ad");
const { crearUsuario } = require("../controllers/usuarios");


router.post("/", crearUsuario);

module.exports = router;  