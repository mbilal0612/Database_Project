const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var adminService = require("../services/adminService");
var classService = require("../services/classService");
var financeService = require("../services/financeService");
var relationService = require("../services/relationService");
var studentService = require("../services/studentService");
var facultyService = require("../services/facultyService");

router.post("/createAdmin", tryCatch(adminService.createAdmin));
router.post("/createClass", tryCatch(classService.createClass));
router.post("/getClassID", tryCatch(classService.getClassID));
router.post("/createAcademicYear", tryCatch(adminService.createAcademicYear));
router.post("/createArrearsByGrade", tryCatch(financeService.createArrearsByGrade));
router.post("/createArrearsByAcademicYear", tryCatch(financeService.createArrearsByAcademicYear));
router.post("/createArrearsByStudentID", tryCatch(financeService.createArrearsByStudentID));
router.post("/createRelation", tryCatch(relationService.createRelation));
router.post("/createStudent", tryCatch(studentService.createStudent));
router.post("/createStudent", tryCatch(studentService.createStudent));
router.post("/createFaculty", tryCatch(facultyService.createFaculty));

router.patch("/deleteTransactionByID", tryCatch(financeService.deleteTransactionByID));
router.patch("/restoreTransactionByID", tryCatch(financeService.restoreTransactionByID));
router.patch("/deleteTransactionByName", tryCatch(financeService.deleteTransactionByName));
router.patch("/restoreTransactionByName", tryCatch(financeService.restoreTransactionByName));

router.get("/getStudentFee/:id", tryCatch(financeService.getStudentFee));
router.get("/generateStudentLedger/:id", tryCatch(financeService.generateStudentLedger));
router.get("/getRelations", tryCatch(relationService.getRelations));
router.get("/getStudentByID/:id", tryCatch(studentService.getStudentById));


module.exports = router