const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var guardianService = require("../services/guardianService");

router.post("/createGuardian", tryCatch(guardianService.createGuardian));

module.exports = router;