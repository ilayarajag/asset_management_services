const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", categoryController.list);
router.get("/new", categoryController.new);
router.post("/", categoryController.create);
router.get("/:id/edit", categoryController.edit);
router.post("/:id", categoryController.update);

module.exports = router;
