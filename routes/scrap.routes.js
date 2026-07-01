const express = require("express");
const router = express.Router();
const scrapController = require("../controllers/scrapController");

router.get("/", scrapController.list);
router.post("/", scrapController.scrap);

module.exports = router;
