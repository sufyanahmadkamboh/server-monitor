const { exec } = require("child_process");

function checkNginx() {
  return new Promise((resolve) => {
    exec("systemctl is-active nginx", (err, stdout) => {
      if (err) return resolve("down");
      resolve(stdout.trim() === "active" ? "up" : "down");
    });
  });
}

module.exports = { checkNginx };