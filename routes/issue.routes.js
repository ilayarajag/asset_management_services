const express = require("express");
const router = express.Router();
const issueController = require("../controllers/issueController");

router.get("/new", issueController.new);
router.post("/", issueController.create);

module.exports = router;
