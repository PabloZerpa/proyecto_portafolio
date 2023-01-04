
const router = require("express").Router();
const { validatorLogin } = require("../validators/login");
const { autenticarUser } = require("../middlewares/ad");
const { login } = require("../controllers/login");

//router.post("/", validatorLogin, autenticarUser, login);
router.post("/", validatorLogin, login);

module.exports = router;  