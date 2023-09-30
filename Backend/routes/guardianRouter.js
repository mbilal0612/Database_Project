const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var guardianService = require("../services/guardianService");
var financeService = require("../services/financeService");

router.post("/createGuardian", tryCatch(guardianService.createGuardian));
router.post("/createGuardianPayment", tryCatch(financeService.createGuardianPayment));

module.exports = router;