const express = require("express");
const router = express.Router();
const assetController = require("../controllers/assetController");

router.get("/", assetController.list);
router.get("/new", assetController.new);
router.post("/", assetController.create);
router.get("/:id/edit", assetController.edit);
router.post("/:id", assetController.update);

module.exports = router;
