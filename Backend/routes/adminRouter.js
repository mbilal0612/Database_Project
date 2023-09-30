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
router.post("/createArrearsByGrade", tryCatch(financeService.createArrearsByGrade));
router.post("/createArrearsByAcademicYear", tryCatch(financeService.createArrearsByAcademicYear));
router.post("/createArrearsByStudentID", tryCatch(financeService.createArrearsByStudentID));

router.patch("/deleteTransactionByID", tryCatch(financeService.deleteTransactionByID));
router.patch("/restoreTransactionByID", tryCatch(financeService.restoreTransactionByID));

router.get("/getStudentFee/:id", tryCatch(financeService.getStudentFee));
router.get("/generateStudentLedger/:id", tryCatch(financeService.generateStudentLedger));

module.exports = router