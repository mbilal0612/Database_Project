const express = require("express");
const tryCatch = require("../middleware/tryCatch");
var router = express.Router();
var courseService = require("../services/courseService");
var auth = require("../middleware/auth");

router.get('/getCourses/:id',tryCatch(courseService.getStudentCourses));

module.exports = router;