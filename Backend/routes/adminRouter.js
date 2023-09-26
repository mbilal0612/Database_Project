const express = require("express");

var router = express.Router();
var adminService = require("../services/adminService");

router.post("/createAdmin", adminService.createAdmin);


module.exports = router