
const router = require("express").Router();
const { validatorLogin, validatorRegistro } = require("../validators/login");
const { autenticarUser } = require("../middlewares/ad");
const { login, registrar, logout } = require("../controllers/login");

router.post("/", validatorLogin, login);

router.post("/registro", validatorRegistro, registrar);

router.get("/logout", logout);


module.exports = router;  