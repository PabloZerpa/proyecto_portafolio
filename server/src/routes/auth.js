
const router = require("express").Router();
const { validatorLogin, validatorRegister } = require("../validators/auth");
const { registerCtrl, loginCtrl, pruebaCtrl } = require("../controllers/auth");
const authUser = require("../utils/handleSession");

router.post("/register", validatorRegister, registerCtrl );

router.post("/login", validatorLogin, loginCtrl );

router.post("/prueba", pruebaCtrl );


module.exports = router;