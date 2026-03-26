const si = require("systeminformation");

async function getSystemStats() {
  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const disk = await si.fsSize();

  return {
    cpu: {
      usagePercent: cpu.currentLoad.toFixed(2),
      cores: cpu.cpus.length
    },
    memory: {
      totalGB: (mem.total / 1e9).toFixed(2),
      usedGB: (mem.used / 1e9).toFixed(2),
      freeGB: (mem.free / 1e9).toFixed(2)
    },
    disk: disk.map(d => ({
      filesystem: d.fs,
      sizeGB: (d.size / 1e9).toFixed(2),
      usedGB: (d.used / 1e9).toFixed(2),
      usagePercent: d.use
    }))
  };
}

module.exports = { getSystemStats };