import { args } from "../src/utils/yargs.js";
import os from "os";
import util from "util";

const cpus = os.cpus();
const info = {
  argumentos: JSON.stringify(args),
  path: process.execPath,
  os: process.platform,
  processid: process.pid,
  nodev: process.version,
  folder: process.cwd(),
  memoria: util.inspect(process.memoryUsage()),
  procesadores: cpus.length,
};

const getInfo = (req, res) => {
  res.render("info.hbs", { info });
};

export { getInfo };
