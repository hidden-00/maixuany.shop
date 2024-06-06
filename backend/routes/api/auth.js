const express = require("express");
const router = express.Router();
const authController = require("../../controller/auth.js");

router.get("/sign-up", authController.getPageRegister);
router.get("/sign-in", authController.getPageLogin);
router.get("/forgot-password", authController.getPageForgotPassword);	

module.exports = router;
