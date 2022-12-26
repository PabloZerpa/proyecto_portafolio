
const router = require("express").Router();
const { validatorLogin } = require("../validators/login");
const { login } = require("../controllers/login");

router.post("/", validatorLogin, login );

module.exports = router;  