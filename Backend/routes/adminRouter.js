const express = require("express");

var router = express.Router();
var adminService = require("../services/adminService");
var classService = require("../services/classService");

router.post("/createAdmin", adminService.createAdmin);
router.post("/createClass", classService.createClass);

module.exports = router