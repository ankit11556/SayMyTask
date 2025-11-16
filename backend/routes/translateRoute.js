const express = require("express");
const { translateText } = require("../controllers/translateController.js");

const router = express.Router();

router.post("/translate", translateText);

module.exports = router;
