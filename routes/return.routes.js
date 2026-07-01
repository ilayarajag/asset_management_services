const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController");

router.get("/new", returnController.new);
router.post("/", returnController.create);

module.exports = router;
