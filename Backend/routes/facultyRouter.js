const express = require("express");
const tryCatch = require("../middleware/tryCatch");

const router = express.Router();
questionService = require("../services/questionService");
cloService = require("../services/cloService");


router.get("/getAllQuestions",tryCatch(questionService.getAllQuestions));
router.get("/getQuestion/:questionId", tryCatch(questionService.getQuestionById));

router.get("/getAllCLO", tryCatch(cloService.getAllClo));
router.get("/getClo/:cloId", tryCatch(cloService.getCloById));

router.post("/createQuestion", tryCatch(questionService.createQuestion));
router.post("/createClo", tryCatch(cloService.createClo));

router.put("/updateQuestion", tryCatch(questionService.updateQuestion));
router.put("/updateClo", tryCatch(cloService.updateClo));

module.exports = router;