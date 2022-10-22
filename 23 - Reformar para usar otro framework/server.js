import Koa from "koa";
import koaBody from "koa-body";
import router from "./routes/index.js";
import config from "./src/config/config.js";
import { logger } from "./src/utils/logger.js";
import cluster from "cluster";
import os from "os";

const isCluster = "FORK";
const cpus = os.cpus();

const app = new Koa();

if (isCluster === "CLUSTER" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });
  cluster.on("exit", (worker) => {
    logger.log("info", `Worker ${worker.process.pid} murio`);
    cluster.fork();
  });
} else {
  app.listen(config.port);
  logger.log("info", `Server listening port ${config.port}`);

  app.use(koaBody());

  app.use(router.routes());

  app.use((ctx) => {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found :(",
      message: "Route not found",
    };
  });
}
