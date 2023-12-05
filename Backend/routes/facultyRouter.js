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
var classService = require("../services/classService");

router.get("/getAllQuestions",[auth, facultyAuth],tryCatch(questionService.getAllQuestions));
router.get("/getQuestion/:questionId", [auth, facultyAuth],tryCatch(questionService.getQuestionById));
router.get("/getQuestionsByClo/:cloId", [auth, facultyAuth],tryCatch(questionService.getQuestionsByCLO));
router.get("/getAllQuestionTypes", [auth, facultyAuth],tryCatch(questionTypeService.getAllQuestionTypes));
router.get("/getFacultyCourses/:facultyId", [auth], tryCatch(courseService.getFacultyCourses));
router.get("/getFacultyById/:id",[auth] , tryCatch(facultyService.getFacultyById));

router.get("/getAllCLO", [auth, facultyAuth],tryCatch(cloService.getAllClo));
router.get("/getClo/:cloId", [auth, facultyAuth],tryCatch(cloService.getCloById));
router.get("/getAllPlos", [auth, facultyAuth],tryCatch(ploService.getPLOs));
router.get("/getplo/:ploID", [auth, facultyAuth],tryCatch(ploService.getPLOByID));
router.get("/getCloByCourse/:courseId", [auth, facultyAuth],tryCatch(cloService.getCloByCourse));
router.get("/getCourseDetails/:classId", [auth, facultyAuth],tryCatch(courseService.getCourseDetails));
router.get("/getStudentPerformance/:studentId/:classId/:courseId",[auth, facultyAuth] ,tryCatch(studentService.getStudentPerformance));
router.get("/getAssessmentsByCourseId/:courseId/:facultyId", [auth, facultyAuth],tryCatch(facultyService.getAssessmentsByCourseId));
router.get("/getAssessmentQuestions/:assessmentId", [auth, facultyAuth], tryCatch(questionService.getAssessmentQuestions));
router.get("/getAllPlo",[auth, facultyAuth], tryCatch(ploService.getPLOs));
router.get("/getClassMarks/:assessmentId/:classId", [auth, facultyAuth], tryCatch(classService.getClassMarks));
router.get("/getCloProgress/:studentId/:courseId", [auth,facultyAuth], tryCatch(cloService.getStudentProgress));

router.post("/linkCLOtoQuestion", [auth, facultyAuth],tryCatch(questionService.assignCLOToQuestion));
router.post("/createQuestionType", [auth, facultyAuth],tryCatch(questionTypeService.createQuestionType));
router.post("/createPlo", [auth, facultyAuth],tryCatch(ploService.createPLO));
router.post("/assignPlo", [auth, facultyAuth],tryCatch(cloService.assignToPlo));
router.post("/createQuestion", [auth, facultyAuth], tryCatch(questionService.createQuestion));
router.post("/insertAssessment", [auth,facultyAuth], tryCatch(questionService.createAssessment));
router.post("/createCLO",[auth, facultyAuth], tryCatch(cloService.createCLO));

router.put("/updateQuestion", [auth, facultyAuth],tryCatch(questionService.updateQuestion));
router.put("/updateClo", [auth, facultyAuth],tryCatch(cloService.updateClo));
router.put("/updateQuestionType", [auth, facultyAuth],tryCatch(questionTypeService.updateQuestionType));
router.put("/updatePlo",[auth, facultyAuth],tryCatch(ploService.updatePLO));
router.put("/updateMarks",[auth,facultyAuth], tryCatch(studentService.assignMarks));


router.delete("/deleteQuestionType", [auth, facultyAuth],tryCatch(questionTypeService.deleteQuestionType));
router.delete("/deletePlo/:ploID", [auth, facultyAuth],tryCatch(ploService.deletePLO));
router.delete("/deleteQuestion/:questionId", [auth, facultyAuth], tryCatch(questionService.deleteQuestion));
router.delete("/deleteAssessment/:assessmentId", [auth, facultyAuth], tryCatch(questionService.deleteAssessment));


module.exports = router;