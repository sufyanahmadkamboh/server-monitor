const pm2 = require("pm2");

function getPM2Status() {
  return new Promise((resolve, reject) => {
    pm2.connect((err) => {
      if (err) return reject(err);

      pm2.list((err, list) => {
        pm2.disconnect();
        if (err) return reject(err);

        const formatted = list.map(p => ({
          name: p.name,
          status: p.pm2_env.status,
          cpu: p.monit.cpu,
          memoryMB: (p.monit.memory / 1024 / 1024).toFixed(2)
        }));

        resolve(formatted);
      });
    });
  });
}

module.exports = { getPM2Status };