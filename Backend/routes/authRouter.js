const express = require("express");
const tryCatch = require("../middleware/tryCatch");
var router = express.Router();

var authservice = require("../services/authService");

router.get("/createUser",tryCatch(authservice.createUser));
router.get("/decryptToken/:token", tryCatch(authservice.decryptToken));

module.exports = router;
