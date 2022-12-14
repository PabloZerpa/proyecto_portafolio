
const router = require("express").Router();
const { getItems, getItem, createItems, updateItems, deleteItems } = require("../controllers/user");
const { validatorCreateItem, validatorGetItem } = require("../validators/user");
const authUser = require("../utils/handleSession");

router.get("/", authUser, getItems);  

router.get("/:id", authUser, validatorGetItem, getItem);

router.post("/", authUser, validatorCreateItem, createItems);

router.put("/:id", authUser, validatorGetItem, validatorCreateItem, updateItems);

router.delete("/:id", authUser, deleteItems);

module.exports = router; 