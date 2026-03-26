const express = require("express");
const router = express.Router();
const { getMonitorData } = require("../controllers/monitor.controller");

router.get("/monitor", getMonitorData);

module.exports = router;