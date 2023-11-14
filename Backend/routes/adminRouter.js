const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var auth = require("../middleware/auth");
var adminAuth = require("../middleware/adminAuth");
var facultyAuth = require("../middleware/facultyAuth");
var studentAuth = require("../middleware/studentAuth");
var guardianAuth = require("../middleware/guardianAuth");
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
var userService = require("../services/userService");
let programService = require("../services/programService");
let ploService = require("../services/ploService");
let nationalitiesService = require("../services/nationalityService");
let religionService = require("../services/religionService");

router.post("/createAdmin",[auth,adminAuth] ,tryCatch(adminService.createAdmin));       //not used
router.post("/createClass",[auth,adminAuth], tryCatch(classService.createClass));
router.post("/getClassID",[auth,adminAuth] ,tryCatch(classService.getClassID));     //not used
router.post("/createArrearsByGrade",[auth,adminAuth] ,tryCatch(financeService.createArrearsByGrade));
router.post("/createArrearsByAcademicYear",[auth,adminAuth] , tryCatch(financeService.createArrearsByAcademicYear));
router.post("/createArrearsByStudentID",[auth,adminAuth] , tryCatch(financeService.createArrearsByStudentID));
router.post("/createRelation",[auth,adminAuth] , tryCatch(relationService.createRelation));
router.post("/assignStudentGuardian", tryCatch(relationService.assignStudentGuardian));
router.post("/createStudent", tryCatch(studentService.createStudent)); // not used
router.post("/createFaculty", tryCatch(facultyService.createFaculty));      //not used
router.post("/createECA",[auth,adminAuth] ,tryCatch(ecaService.createEca));   
router.post("/assignEca",[auth,adminAuth] , tryCatch(studentService.assignStudentECA));
router.post("/linkQualification",[auth,adminAuth] , tryCatch(qualificationService.linkQualification));
router.post("/createQualification", [auth,adminAuth] ,tryCatch(qualificationService.createQualification));
router.post("/createCourse", [auth,adminAuth] ,tryCatch(courseService.createCourse));
router.post("/createAttendance",tryCatch(attendanceService.createAttendance));
router.post("/createBatchAttendance",tryCatch(attendanceService.createBatchAttendance));
router.post("/createAcademicYear",[auth,adminAuth] , tryCatch(academicYearService.createAcademicYear));
router.post("/enrollStudentToClass",[auth,adminAuth] , tryCatch(enrollmentService.enrollStudentToClass));
router.post("/createUser",[auth,adminAuth] , tryCatch(userService.createUser));
router.post("/queryLogin", tryCatch(userService.queryLogin));
router.post("/createProgram", tryCatch(programService.createProgram));
router.post("/devCreateUser", tryCatch(userService.developmentCreateUser));

router.patch("/deleteTransactionByID",[auth,adminAuth] , tryCatch(financeService.deleteTransactionByID));
router.patch("/restoreTransactionByID",[auth,adminAuth] , tryCatch(financeService.restoreTransactionByID));
router.patch("/deleteTransactionByName",[auth,adminAuth] , tryCatch(financeService.deleteTransactionByName));
router.patch("/restoreTransactionByName",[auth,adminAuth] , tryCatch(financeService.restoreTransactionByName));
router.patch("/deleteFacultyQualification",[auth,adminAuth] , tryCatch(qualificationService.deleteQualification_faculty));
router.patch("/deleteQualification", [auth,adminAuth] ,tryCatch(qualificationService.deleteQualification))
router.patch("/updateRelationByName", [auth,adminAuth] ,tryCatch(relationService.updateRelationByName));
router.patch("/deleteAllGuardianRelations",[auth,adminAuth] , tryCatch(relationService.deleteAllGuardianRelations));
router.patch("/deleteAllStudentRelations",[auth,adminAuth] , tryCatch(relationService.deleteAllStudentRelations));
router.patch("/restoreAllGuardianRelations",[auth,adminAuth] ,tryCatch(relationService.restoreAllGuardianRelations));
router.patch("/restoreAllStudentRelations",[auth,adminAuth] , tryCatch(relationService.restoreAllStudentRelations));
router.patch("/restoreSpecificRelation",[auth,adminAuth] , tryCatch(relationService.restoreSpecificRelation));
router.patch("/deleteSpecificRelation",[auth,adminAuth] , tryCatch(relationService.deleteSpecificRelation));
router.patch("/updateRelationNameByID", [auth,adminAuth] ,tryCatch(relationService.updateRelationNameByID))
router.patch("/updateExistingRelationshipType",[auth,adminAuth] , tryCatch(relationService.updateExistingRelationshipType))
router.patch("/updateAttendance", [auth,adminAuth] ,tryCatch(attendanceService.updateAttendance));
router.patch("/deleteAcademicYear",[auth,adminAuth] , tryCatch(academicYearService.deleteAcademicYear));
router.patch("/restoreAcademicYear",[auth,adminAuth] , tryCatch(academicYearService.restoreAcademicYear));
router.patch("/setAcademicYearDays", [auth,adminAuth] ,tryCatch(academicYearService.setAcademicYearDays));
router.patch("/denrollStudentFromClass", [auth,adminAuth] ,tryCatch(enrollmentService.denrollStudentFromClass));
router.patch("/changeUserPassword", [auth,adminAuth] ,tryCatch(userService.changeUserPassword));
router.post("/devForcePasswordReset", tryCatch(userService.developmentForcePasswordReset));

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
router.get("/getAcademicYears", [auth], tryCatch(academicYearService.getAcademicYears));
router.get("/getClassByAcademicYear/:startYear", tryCatch(classService.getClassByAcademicYear));
router.get("/getClassByID/:classID", tryCatch(classService.getClassByID));
router.get("/getClassesForArrears", [auth],tryCatch(classService.getClassesForArrears));
router.get("/allPrograms", tryCatch(programService.getAllPrograms));
router.get("/getProgram/:programName", tryCatch(programService.getProgramByID));
router.get("/ploForProgram/:programName", tryCatch(ploService.getPloByProgram));
router.get("/getNationalities", tryCatch(nationalitiesService.getNationalities));
router.get("/getReligions", tryCatch(religionService.getReligions));
router.get("/getAllClasses", [auth], tryCatch(classService.getAllClasses))

router.put("/updateECA", tryCatch(ecaService.updateEcaName));
router.put("/updateCourseName", tryCatch(courseService.updateCourse));
router.put("/updateFacultyDetails",tryCatch(facultyService.updateFaculty));
router.put("/updateProgram", tryCatch(programService.updateProgram));
router.put("/assignPlo", tryCatch(programService.assignPlo));

router.delete("/deleteProgram/:programName", tryCatch(programService.deleteProgram));


module.exports = router