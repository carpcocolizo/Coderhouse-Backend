import express from "express";
import { Server } from "socket.io";
import path from "path";
import rutas from "../routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import { config } from "./config/config.js";
import cluster from "cluster";
import os from "os";
import compression from "compression";
import { logger } from "./utils/logger.js";
import configSocket from "./utils/websockets.js";
import { args } from "./utils/yargs.js";

const cpus = os.cpus();
const isCluster = args.modo.toUpperCase();

//Seleccion de modo CLUSTER o FORK segun params

if (isCluster === "CLUSTER" && cluster.isPrimary) {
  cpus.map(() => {
    cluster.fork();
  });
  cluster.on("exit", (worker) => {
    logger.log("info", `Worker ${worker.process.pid} murio`);
    cluster.fork();
  });
} else {
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  //Inicio de servidor

  const app = express();
  const puerto = args.p;
  const expressServer = app.listen(process.env.PORT || puerto, () => {
    logger.log(
      "info",
      `El servidor se inicio en el puerto ${puerto}, PDI del proceso: ${process.pid}`
    );
  });

  const io = new Server(expressServer);

  // Config de handlebars

  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "",
      layoutsDir: path.join(__dirname, "./views/layout"),
      partialsDir: path.join(__dirname, "./views/partials"),
    })
  );

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "./views"));

  // Config de cookies

  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.dbmongo,
        mongoOptions,
      }),
      secret: config.secretcookie,
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

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(express.static(path.join(__dirname, "../public")));

  app.use(compression());

  // Conexion con el socket

  io.on("connection", async (socket) => {
    logger.log("info", `Se conecto un usuario: ${socket.id}`);
    configSocket(socket, io);
  });

  app.use("/", rutas);

  // Rutas no declaradas

  app.get("/*", (req, res) => {
    logger.log(
      "warn",
      `ruta: ${req.url} con metodo: ${req.method} es inexistente`
    );
    res.json({
      Error: `ruta: ${req.url} con metodo: ${req.method} es inexistente`,
    });
  });
}
logger.log("info", isCluster);
