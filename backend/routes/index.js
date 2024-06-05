const express = require("express");
const router = express.Router();
const templateRoutes = require("./api/template.js");
const adminRoutes = require("./api/admin.js");

router.use("/", adminRoutes);
router.use("/template", templateRoutes);

module.exports = router;
