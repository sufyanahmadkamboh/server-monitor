const si = require("systeminformation");

exports.getSystemStats = async () => {
  const cpu = await si.currentLoad();
  const mem = await si.mem();
  const disks = await si.fsSize();

  const rootDisk = disks.find(d => d.mount === "/");
  const dataDisk = disks.find(d => d.mount === "/data");

  return {
    cpuUsagePercent: cpu.currentLoad.toFixed(2),
    cpuCores: cpu.cpus.length,

    memory: {
      totalGB: (mem.total / 1e9).toFixed(2),
      usedGB: (mem.used / 1e9).toFixed(2),
      freeGB: (mem.free / 1e9).toFixed(2)
    },

    disk: {
      root: rootDisk
        ? {
            totalTB: (rootDisk.size / 1e12).toFixed(3),
            usedTB: (rootDisk.used / 1e12).toFixed(3),
            usagePercent: rootDisk.use
          }
        : null,

      data: dataDisk
        ? {
            totalGB: (dataDisk.size / 1e9).toFixed(0),
            usedGB: (dataDisk.used / 1e9).toFixed(1),
            usagePercent: dataDisk.use
          }
        : null
    }
  };
};