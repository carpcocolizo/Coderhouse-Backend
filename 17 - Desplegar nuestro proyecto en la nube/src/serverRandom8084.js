import express from "express";
import cluster from "cluster";
import rutasRandom from "../routes/random.js";
import yargs from "yargs";
import os from "os";

const app = express();

const args = yargs(process.argv.slice(2))
  .alias({ p: "puerto", m: "modo" })
  .default({ puerto: 8084, modo: "FORK" }).argv;
const cpus = os.cpus();
const isCluster = args.modo.toUpperCase();

const puerto = args.p;

if (isCluster === "CLUSTER" && cluster.isPrimary) {
    cpus.map(() => {
      cluster.fork();
    });
    cluster.on("exit", (worker) => {
      console.log(`Worker ${worker.process.pid} murio`);
      cluster.fork();
    });
  } else {
    const expressServer = app.listen(puerto, () => {
      console.log(
        `El servidor se inicio en el puerto ${puerto}, PDI del proceso: ${process.pid}`
      );
    });
    app.use("/", rutasRandom);
}