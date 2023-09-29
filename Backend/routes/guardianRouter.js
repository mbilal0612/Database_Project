const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var parentService = require("../services/parentService");

router.post("/createParent", tryCatch(parentService.createParent));

module.exports = router;