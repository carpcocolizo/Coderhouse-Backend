import express from "express";
import path from "path";
import rutas from "../routes/index.js";
import rutasauth from "../routes/rutasauth.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import cluster from "cluster";
import os from "os";
import { logger } from "./logger.js";

const app = express();
const port = process.env.PORT || 8080;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const isCluster = "FORK";
const cpus = os.cpus();

if (isCluster === "CLUSTER" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });
  cluster.on("exit", (worker) => {
    logger.log("info",`Worker ${worker.process.pid} murio`);
    cluster.fork();
  });
} else {
  app.listen(port, () => {
    logger.log("info", `El servidor se inicio en el puerto ${port}`);
  });

  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "",
      layoutsDir: path.join(__dirname, "./views/layout"),
      partialsDir: path.join(__dirname, "./views/partials"),
    })
  );

  app.use("/upload", express.static(__dirname + "/upload"));

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "./views"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING,
        mongoOptions,
      }),
      secret: process.env.SECRETCOOKIE,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 600000,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(__dirname, "../public")));

  app.use("/", rutasauth);

  app.use("/api", rutas);

  app.use("*", function (req, res) {
    res.json({
      error: -2,
      descripcion: `ruta ${req.path} método ${req.method} no implementada`,
    });
  });
}
