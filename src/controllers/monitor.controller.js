const { getSystemStats } = require("../services/system.service");
const { getPM2Services } = require("../services/pm2.service");
const { checkNginx } = require("../services/nginx.service");

exports.getMonitorData = async (req, res) => {
  try {
    const system = await getSystemStats();
    const services = await getPM2Services();
    const nginx = await checkNginx();

    res.json({
      timestamp: new Date(),
      system,
      nginx,
      services
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};