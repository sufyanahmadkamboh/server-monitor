const { exec } = require("child_process");

exports.checkNginx = () => {
  return new Promise(resolve => {
    exec("systemctl is-active nginx", (err, stdout) => {
      if (err) return resolve("DOWN");
      resolve(stdout.trim() === "active" ? "UP" : "DOWN");
    });
  });
};