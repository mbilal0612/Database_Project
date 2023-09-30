const express = require("express");
const tryCatch = require("../middleware/tryCatch");

var router = express.Router();
var adminService = require("../services/adminService");
var classService = require("../services/classService");
var financeService = require("../services/financeService");

router.post("/createAdmin", tryCatch(adminService.createAdmin));
router.post("/createClass", tryCatch(classService.createClass));
router.post("/getClassID", tryCatch(classService.getClassID));
router.post("/createAcademicYear", tryCatch(adminService.createAcademicYear));
router.post("/createArrearsByGrade", financeService.createArrearsByGrade);
router.post("/createArrearsByAcademicYear", financeService.createArrearsByAcademicYear);
router.get("/getStudentFee/:id", tryCatch(financeService.getStudentFee));

module.exports = router