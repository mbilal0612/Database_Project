const express = require("express");
const tryCatch = require("../middleware/tryCatch");

const router = express.Router();
questionService = require("../services/questionService");
questionTypeService = require("../services/questionTypeService");
cloService = require("../services/cloService");


router.get("/getAllQuestions",tryCatch(questionService.getAllQuestions));
router.get("/getQuestion/:questionId", tryCatch(questionService.getQuestionById));
router.get("/getQuestionsByClo/:cloId", tryCatch(questionService.getQuestionsByCLO));
router.get("/getAllQuestionTypes", tryCatch(questionTypeService.getAllQuestionTypes));

router.get("/getAllCLO", tryCatch(cloService.getAllClo));
router.get("/getClo/:cloId", tryCatch(cloService.getCloById));

router.post("/createQuestion", tryCatch(questionService.createQuestion));
router.post("/createClo", tryCatch(cloService.createClo));
router.post("/linkCLOtoQuestion", tryCatch(questionService.assignCLOToQuestion));
router.post("/createQuestionType", tryCatch(questionTypeService.createQuestionType));

router.put("/updateQuestion", tryCatch(questionService.updateQuestion));
router.put("/updateClo", tryCatch(cloService.updateClo));
router.put("/updateQuestionType", tryCatch(questionTypeService.updateQuestionType));

router.delete("/deleteQuestionType", tryCatch(questionTypeService.deleteQuestionType));


module.exports = router;