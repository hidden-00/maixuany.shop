const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.js");

router.get("/sign-up", authController.getPageRegister);

module.exports = router;
