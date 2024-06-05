const express = require("express");
const router = express.Router();
const dashboardController = require("../../controller/dashboard.js");

router.get("/", dashboardController.getIndexPage);

module.exports = router;
