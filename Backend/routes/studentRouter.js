const express = require("express");
const tryCatch = require("../middleware/tryCatch");
var router = express.Router();
var courseService = require("../services/courseService");
var auth = require("../middleware/auth");
var studentAuth = require("../middleware/studentAuth");
var studentService = require("../services/studentService");


router.get("/getStudentCourses/:id", tryCatch(courseService.getStudentCourses));
router.get("/getStudentPerformance/:studentId/:classId/:courseId",[auth, studentAuth] ,tryCatch(studentService.getStudentPerformance));

module.exports = router;
