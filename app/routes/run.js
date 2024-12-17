// import fs from "fs";
// import {
//   system as _system,
//   cpu as _cpu,
//   mem as _mem,
//   users,
//   osInfo as _osInfo,
//   fsSize,
//   networkInterfaces,
//   cpuTemperature as _cpuTemperature,
// } from "systeminformation";

// const collectSystemInfo = async () => {
//   try {
//     const [system, cpu, mem, user, osInfo, disk, network] = await Promise.all([
//       _system(),
//       _cpu(),
//       _mem(),
//       users(),
//       _osInfo(),
//       fsSize(), // Gets disk storage information
//       networkInterfaces(), // Gets network information
//     ]);

//     // Collect more detailed CPU data
//     // const cpuCurrents = await si.cpuCurrentspeed();
//     const cpuTemperature = await _cpuTemperature();

//     console.log("System information saved successfully");

//     console.log({
//       macAddress: system.uuid,
//       platform: osInfo?.platform,
//       release: osInfo?.release,
//       type: osInfo?.type,
//       arch: osInfo?.arch,
//       hostname: osInfo?.hostname,
//       uptime: osInfo?.uptime,
//       userInfo: user.length > 0 ? user[0] : null, // Assuming you want the first user
//       cpuInfo: {
//         ...cpu,
//         // speedCurrent: cpuCurrents.avg, // Average current speed
//         temperature: cpuTemperature.main, // Main temperature reading
//       },
//       memInfo: {
//         total: mem.total,
//         free: mem.free,
//         used: mem.used,
//         active: mem.active,
//         available: mem.available,
//       },
//       diskInfo: disk.map((d) => ({
//         fs: d.fs, // File system
//         type: d.type, // Type
//         size: d.size, // Total size
//         used: d.used, // Used size
//         available: d.size - d.used, // Available size
//         mount: d.mount, // Mount point
//       })),
//       networkInfo: network.map((net) => ({
//         iface: net.iface, // Network interface name
//         ip4: net.ip4, // IPv4 address
//         ip6: net.ip6, // IPv6 address
//         mac: net.mac, // MAC address
//         internal: net.internal, // Whether it's internal or external
//       })),
//       systemInfo: null, // You can populate this with additional system process info if needed
//       // softwareInfo: software.installed.map((sw) => ({
//       //   name: sw.name,
//       //   version: sw.version,
//       // })),
//     });
//   } catch (error) {
//     console.error("Error collecting system information:", error);
//   }
// };

// collectSystemInfo();
