const express = require("express");
const { getSystemStats } = require("./services/system");
const { checkNginx } = require("./services/nginx");
const { getPM2Status } = require("./services/pm2");

const app = express();

app.get("/monitor", async (req, res) => {
  try {
    const system = await getSystemStats();
    const nginx = await checkNginx();
    const pm2 = await getPM2Status();

    res.json({
      timestamp: new Date(),
      system,
      nginx,
      pm2
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(4000, () => {
  console.log("Monitor service running on port 4000");
});