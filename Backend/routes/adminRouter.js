const express = require("express");

var adminRouter = express.Router();
var adminService = require("../services/adminService");

adminRouter.get("/getUser", adminService.getUser);


module.exports = {
    adminRouter
}