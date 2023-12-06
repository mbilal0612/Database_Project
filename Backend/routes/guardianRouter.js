const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var guardianService = require("../services/guardianService");
var financeService = require("../services/financeService");
let courseService = require("../services/courseService");
let attendanceService = require("../services/attendanceService");
let cloService = require("../services/cloService");

router.post("/createGuardian", tryCatch(guardianService.createGuardian));
router.post("/createGuardianPayment", tryCatch(financeService.createGuardianPayment));

router.get("/getAllChildren/:guardianId", tryCatch(guardianService.getChildren));
router.get("/getAllChildrenAttendance/:guardianId", tryCatch(guardianService.getChildrenAttendance));
router.get("/getChildrenFee/:id", tryCatch(financeService.getStudentFee));
router.get("/getStudentLedger/:id", tryCatch(financeService.generateStudentLedger));
router.get("/getChildrenClass/:studentId", tryCatch(guardianService.getChildrenClass));
router.get("/getClassCourse/:classId", tryCatch(guardianService.getClassCourse));
router.get("/getChildrenCourseAssessment/:studentId/:courseId", tryCatch(guardianService.getChildrenCourseAssessment));
router.get("/getRecentChildrenClass/:studentId", tryCatch(guardianService.getRecentChildrenClass));
router.get("/getChildrenEca/:studentId", tryCatch(guardianService.getChildrenECA));
router.get("/getChildrenAttendanceSummary/:studentID", tryCatch(attendanceService.getAttendanceSummary));
router.get("/getCloIds/:studentId/:courseId", tryCatch(cloService.getStudentProgress));
router.get("/getClorow/:cloId/:studentId/:courseId", tryCatch(cloService.clohelper2));

module.exports = router;