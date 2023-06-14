
const router = require("express").Router();
const { validatorLogin, validatorRegistro } = require("../validators/login");
const { verificarUser, autenticarUser } = require("../middlewares/ad");
const { login, registrar, logout } = require("../controllers/login");

router.post("/", autenticarUser, validatorLogin, login);

router.post("/registro", verificarUser, validatorRegistro, registrar);

router.get("/logout/:id", logout); 


module.exports = router;  