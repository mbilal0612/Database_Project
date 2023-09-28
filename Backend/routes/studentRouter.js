const express = require("express");

var router = express.Router();
var studentService = require("../services/studentService");

router.post("/createStudent", studentService.createStudent);


module.exports = router;