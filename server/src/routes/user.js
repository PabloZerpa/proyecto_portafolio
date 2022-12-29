
const router = require("express").Router();
const { getItems, getItem, createItems, updateItems, deleteItems } = require("../controllers/user");
const { auth } = require("../middlewares/auth");
const { validatorCreateItem, validatorGetItem } = require("../validators/user");

router.get("/", auth, getItems); 

router.get("/:id", validatorGetItem, getItem);

router.post("/", validatorCreateItem, createItems);

router.put("/:id", validatorGetItem, validatorCreateItem, updateItems);

router.delete("/:id", deleteItems);

module.exports = router; 