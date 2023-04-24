
const router = require("express").Router();
const { validatorLogin, validatorRegistro } = require("../validators/login");
const { autenticarUser } = require("../middlewares/ad");
const { login, registrar, obtenerTotal } = require("../controllers/login");

//router.post("/", validatorLogin, autenticarUser, login);
router.post("/", validatorLogin, login);

router.post("/registro", validatorRegistro, registrar);

router.get("/total", obtenerTotal);

module.exports = router;  