
const router = require("express").Router();
const { getItems, getItem, createItems, updateItems, deleteItems, getByUpdateDate, getByCreateDate, getByTerm } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { autenticarUser } = require("../middlewares/ad");
const { validatorCreateItem, validatorGetItem } = require("../validators/user");

// router.post("/ad", autenticarUser);

router.get("/", auth, getItems);

router.get("/u", auth, getByUpdateDate);

router.get("/c", auth, getByCreateDate);

router.post("/term", getByTerm); 

router.get("/:id", getItem);

// router.post("/", validatorCreateItem, createItems);

router.put("/:id", updateItems);

router.delete("/:id", deleteItems);

module.exports = router; 