const express = require("express");

var router = express.Router();
var parentService = require("../services/parentService");

router.post("/createParent", parentService.createParent);

module.exports = router;