const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var adminService = require("../services/adminService");
var classService = require("../services/classService");
var financeService = require("../services/financeService");
var facultyService = require("../services/facultyService");
var relationService = require("../services/relationService");
var studentService = require("../services/studentService");
var attendanceService = require("../services/attendanceService");
var ecaService = require("../services/ecaService");
var qualificationService = require("../services/qualifService");
var courseService = require("../services/courseService");
var academicYearService = require("../services/academicYearService");
var enrollmentService = require("../services/enrollmentService");

router.post("/createAdmin", tryCatch(adminService.createAdmin));
router.post("/createClass", tryCatch(classService.createClass));
router.post("/getClassID", tryCatch(classService.getClassID));
router.post("/createArrearsByGrade", tryCatch(financeService.createArrearsByGrade));
router.post("/createArrearsByAcademicYear", tryCatch(financeService.createArrearsByAcademicYear));
router.post("/createArrearsByStudentID", tryCatch(financeService.createArrearsByStudentID));
router.post("/createRelation", tryCatch(relationService.createRelation));
router.post("/assignStudentGuardian", tryCatch(relationService.assignStudentGuardian));
router.post("/createStudent", tryCatch(studentService.createStudent));
router.post("/createFaculty", tryCatch(facultyService.createFaculty));
router.post("/createECA",tryCatch(ecaService.createEca));
router.post("/assignEca", tryCatch(studentService.assignStudentECA));
router.post("/linkQualification", tryCatch(qualificationService.linkQualification));
router.post("/createQualification", tryCatch(qualificationService.createQualification));
router.post("/createCourse",tryCatch(courseService.createCourse));
router.post("/createAttendance",tryCatch(attendanceService.createAttendance));
router.post("/createBatchAttendance",tryCatch(attendanceService.createBatchAttendance));
router.post("/createAcademicYear", tryCatch(academicYearService.createAcademicYear));
router.post("/enrollStudentToClass", tryCatch(enrollmentService.enrollStudentToClass));

router.patch("/deleteTransactionByID", tryCatch(financeService.deleteTransactionByID));
router.patch("/restoreTransactionByID", tryCatch(financeService.restoreTransactionByID));
router.patch("/deleteTransactionByName", tryCatch(financeService.deleteTransactionByName));
router.patch("/restoreTransactionByName", tryCatch(financeService.restoreTransactionByName));
router.patch("/deleteFacultyQualification", tryCatch(qualificationService.deleteQualification_faculty));
router.patch("/deleteQualification", tryCatch(qualificationService.deleteQualification))
router.patch("/updateRelationByName", tryCatch(relationService.updateRelationByName));
router.patch("/deleteAllGuardianRelations", tryCatch(relationService.deleteAllGuardianRelations));
router.patch("/deleteAllStudentRelations", tryCatch(relationService.deleteAllStudentRelations));
router.patch("/restoreAllGuardianRelations", tryCatch(relationService.restoreAllGuardianRelations));
router.patch("/restoreAllStudentRelations", tryCatch(relationService.restoreAllStudentRelations));
router.patch("/restoreSpecificRelation", tryCatch(relationService.restoreSpecificRelation));
router.patch("/deleteSpecificRelation", tryCatch(relationService.deleteSpecificRelation));
router.patch("/updateRelationNameByID", tryCatch(relationService.updateRelationNameByID))
router.patch("/updateExistingRelationshipType", tryCatch(relationService.updateExistingRelationshipType))
router.patch("/updateAttendance", tryCatch(attendanceService.updateAttendance));
router.patch("/deleteAcademicYear", tryCatch(academicYearService.deleteAcademicYear));
router.patch("/restoreAcademicYear", tryCatch(academicYearService.restoreAcademicYear));
router.patch("/setAcademicYearDays", tryCatch(academicYearService.setAcademicYearDays));
router.patch("/denrollStudentFromClass", tryCatch(enrollmentService.denrollStudentFromClass));

router.get("/getStudentFee/:id", tryCatch(financeService.getStudentFee));
router.get("/generateStudentLedger/:id", tryCatch(financeService.generateStudentLedger));
router.get("/getRelations", tryCatch(relationService.getRelations));
router.get("/getStudentByID/:id", tryCatch(studentService.getStudentById));
router.get("/getAllEca", tryCatch(ecaService.getAllEca));
router.get("/getEcaId", tryCatch(ecaService.getEcaId));
router.get("/getAllStudents",tryCatch(studentService.getAllStudents));
router.get("/getStudentEca/:id", tryCatch(studentService.getStudentECA));
router.get("/getAllCourses",tryCatch(courseService.getAllCourse));
router.get("/getCourseById/:Id", tryCatch(courseService.getCourseById));
router.get("/searchSimilarCourse/:searchTerm", tryCatch(courseService.getSimilarCourse));
router.get("/getFacultyById/:id", tryCatch(facultyService.getFacultyById));
router.get("/getAllFaculty", tryCatch(facultyService.getAllFaculty));
router.get("/getQualificationsById/:facultyID", tryCatch(qualificationService.getQualifs));
router.get("/getAllQualifications", tryCatch(qualificationService.getAllQualifications));
router.get("/getRelationID/:relationName", tryCatch(relationService.getRelationByID));
router.get("/getRelationByGuardianID/:guardianID", tryCatch(relationService.getRelationByGuardianID));
router.get("/getRelationByStudentID/:studentID", tryCatch(relationService.getRelationByStudentID));
router.get("/getStudentsByClass/:classAcademicYear/:classGrade/:classSection", tryCatch(enrollmentService.getStudentsByClass));
router.get("/getStudentsByClassID/:classID", tryCatch(enrollmentService.getStudentsByClassID));
router.get("/getStudentEntireAttendanceReport/:studentID", tryCatch(attendanceService.getStudentEntireAttendanceReport));
router.get("/getStudentAttendanceReportByAcademicYear/:studentID/:startYear", tryCatch(attendanceService.getStudentAttendanceReportByAcademicYear));
router.get("/getAcademicYears", tryCatch(academicYearService.getAcademicYears));
router.get("/getClassByAcademicYear/:startYear", tryCatch(classService.getClassByAcademicYear));
router.get("/getClassByID/:classID", tryCatch(classService.getClassByID));

router.put("/updateECA", tryCatch(ecaService.updateEcaName));
router.put("/updateCourseName", tryCatch(courseService.updateCourse));
router.put("/updateFacultyDetails",tryCatch(facultyService.updateFaculty));

module.exports = router