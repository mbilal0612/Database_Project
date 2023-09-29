const express = require("express");

var router = express.Router();
var guardianService = require("../services/guardianService");

router.post("/createGuardian", guardianService.createGuardian);

module.exports = router;