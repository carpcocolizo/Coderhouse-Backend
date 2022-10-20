import express from "express";
import path from "path";
import rutas from "./routes/index.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import passport from "passport";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import cluster from "cluster";
import os from "os";
import { logger } from "./src/utils/logger.js"
import config from "./src/config/config.js";
import cors from "cors"
import { graphqlHTTP } from "express-graphql";
import productoSchema from "./src/utils/grpahqlSchema.js";
import graphProductosController from "./controllers/graphProductosController.js";

const app = express();
const port = config.port || 8080;
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

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultLayout: "",
      layoutsDir: path.join(__dirname, "./src/views/layout"),
      partialsDir: path.join(__dirname, "./src/views/partials"),
    })
  );

  app.use("/upload", express.static(__dirname + "/upload"));

  app.set("view engine", "hbs");
  app.set("views", path.join(__dirname, "./src/views"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.CONNECTIONSTRING,
        mongoOptions,
      }),
      secret: config.secretCookie,
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

  app.use(express.static(path.join(__dirname, "./public")));

  app.use(
    "/graphql",
    graphqlHTTP({
      schema: productoSchema,
      rootValue: {
        getProductoById: graphProductosController.getProductoById,
        getAllProductos: graphProductosController.getAllProductos,
        createProducto: graphProductosController.createProducto,
        updateProducto: graphProductosController.updateProducto,
        deleteProducto: graphProductosController.deleteProducto,
      },
      graphiql: true,
    })
  );

  app.use("/", rutas);

  app.use("*", function (req, res) {
    res.json({
      error: -2,
      descripcion: `ruta ${req.originalUrl} método ${req.method} no implementada`,
    });
  });
}
