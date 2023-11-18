const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var questionService = require("../services/questionService");
var questionTypeService = require("../services/questionTypeService");
var facultyService = require("../services/facultyService");
var cloService = require("../services/cloService");
var ploService = require("../services/ploService");
var courseService = require("../services/courseService");
var auth = require("../middleware/auth");
var facultyAuth = require("../middleware/facultyAuth");
var studentService = require("../services/studentService");

router.get("/getAllQuestions",tryCatch(questionService.getAllQuestions));
router.get("/getQuestion/:questionId", tryCatch(questionService.getQuestionById));
router.get("/getQuestionsByClo/:cloId", tryCatch(questionService.getQuestionsByCLO));
router.get("/getAllQuestionTypes", tryCatch(questionTypeService.getAllQuestionTypes));
router.get("/getFacultyCourses/:facultyId", [auth], tryCatch(courseService.getFacultyCourses));
router.get("/getFacultyById/:id",[auth] , tryCatch(facultyService.getFacultyById));

router.get("/getAllCLO", tryCatch(cloService.getAllClo));
router.get("/getClo/:cloId", tryCatch(cloService.getCloById));
router.get("/getAllPlos", tryCatch(ploService.getPLOs));
router.get("/getplo/:ploID", tryCatch(ploService.getPLOByID));
router.get("/getCloByCourse/:courseId", tryCatch(cloService.getCloByCourse));
router.get("/getCourseDetails/:classId", tryCatch(courseService.getCourseDetails));
router.get("/getStudentPerformance/:studentId/:classId/:courseId", tryCatch(studentService.getStudentPerformance));
router.get("/getAssessmentsByCourseId/:courseId/:facultyId", [auth],tryCatch(facultyService.getAssessmentsByCourseId));

router.post("/createClo", tryCatch(cloService.createClo));
router.post("/linkCLOtoQuestion", tryCatch(questionService.assignCLOToQuestion));
router.post("/createQuestionType", tryCatch(questionTypeService.createQuestionType));
router.post("/createPlo", tryCatch(ploService.createPLO));
router.post("/assignPlo", tryCatch(cloService.assignToPlo));
router.post("/createQuestion", [auth], tryCatch(facultyService.createQuestion));

router.put("/updateQuestion", tryCatch(questionService.updateQuestion));
router.put("/updateClo", tryCatch(cloService.updateClo));
router.put("/updateQuestionType", tryCatch(questionTypeService.updateQuestionType));
router.put("/updatePlo",tryCatch(ploService.updatePLO));


router.delete("/deleteQuestionType", tryCatch(questionTypeService.deleteQuestionType));
router.delete("/deletePlo/:ploID", tryCatch(ploService.deletePLO));


module.exports = router;