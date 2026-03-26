const pm2 = require("pm2");
const { formatWeeks } = require("../utils/format.util");

exports.getPM2Services = () => {
  return new Promise((resolve, reject) => {
    pm2.connect(err => {
      if (err) return reject(err);

      pm2.list((err, list) => {
        pm2.disconnect();
        if (err) return reject(err);

        const services = list.map(proc => {
          const uptimeSeconds = proc.pm2_env.pm_uptime
            ? Math.floor((Date.now() - proc.pm2_env.pm_uptime) / 1000)
            : 0;

          return {
            name: proc.name,
            status: proc.pm2_env.status.toUpperCase(),
            cpuPercent: proc.monit.cpu,
            memoryMB: (proc.monit.memory / 1024 / 1024).toFixed(2),
            uptimeWeeks: formatWeeks(uptimeSeconds)
          };
        });

        resolve(services);
      });
    });
  });
};