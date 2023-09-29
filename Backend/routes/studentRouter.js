const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var studentService = require("../services/studentService");

router.post("/createStudent", tryCatch(studentService.createStudent));


module.exports = router;