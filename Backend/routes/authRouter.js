const express = require("express");

var router = express.Router();

var authservice = require("../services/authService");

router.get("/createUser",authservice.createUser);

module.exports = router;
