const express = require("express");
const router = express.Router();
const templateRoutes = require("./api/template.js");
const adminRoutes = require("./api/admin.js");
const authRoutes = require("./api/auth.js");

router.use("/", adminRoutes);
router.use("/auth", authRoutes);
router.use("/template", templateRoutes);

module.exports = router;
