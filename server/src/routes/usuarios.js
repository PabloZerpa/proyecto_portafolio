
const router = require("express").Router();
const { auth, authAdmin } = require("../middlewares/auth");
const { cambiarPermisos, cambiarPassword, 
    obtenerUsuarios, obtenerPorBusqueda, obtenerRoles, obtenerCargos, 
    obtenerGerencias, obtenerResponsables, obtenerLenguajes, obtenerPlataformas, 
    obtenerBasesDatos, obtenerServidores, obtenerAlcance, obtenerEstatus, 
    obtenerRegiones, obtenerMantenimientos, obtenerAmbientes, obtenerMane, obtenerTipos, obtenerSistemas, obtenerMarcas, obtenerTotal, eliminarAplicacion } = require("../controllers/usuarios");

router.get("/", auth, obtenerUsuarios);

router.get("/roles", auth, obtenerRoles);
router.get("/gerencias", auth, obtenerGerencias);
router.get("/cargos", auth, obtenerCargos);
router.get("/responsables", auth, obtenerResponsables);
router.get("/lenguajes", auth, obtenerLenguajes);
router.get("/plataformas", auth, obtenerPlataformas);
router.get("/basesdatos", auth, obtenerBasesDatos);
router.get("/servidores", auth, obtenerServidores);
router.get("/estatus", auth, obtenerEstatus);
router.get("/alcance", auth, obtenerAlcance);
router.get("/mantenimientos", auth, obtenerMantenimientos);
router.get("/regiones", auth, obtenerRegiones);

router.get("/tipos", auth, obtenerTipos);
router.get("/manejadores", auth, obtenerMane);
router.get("/ambientes", auth, obtenerAmbientes);

router.get("/sistemas", auth, obtenerSistemas);
router.get("/marcas", auth, obtenerMarcas);


router.get("/cargos", auth, obtenerUsuarios);

router.post("/busqueda", auth, obtenerPorBusqueda);

router.patch("/permisos/:id", auth, cambiarPermisos);

router.patch("/password/:id", auth, cambiarPassword);

router.delete("/eliminar/:id", auth, eliminarAplicacion);

module.exports = router;  