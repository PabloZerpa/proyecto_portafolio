
const router = require("express").Router();
const { validatorLogin, validatorRegistro } = require("../validators/login");
const { verificarUser } = require("../middlewares/ad");
const { login, registrar, logout } = require("../controllers/login");

router.post("/", verificarUser, validatorLogin, login);

router.post("/registro", verificarUser, validatorRegistro, registrar);

router.get("/logout", logout); 


module.exports = router;  