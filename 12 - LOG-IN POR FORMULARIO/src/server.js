import express from "express";
import { Server } from "socket.io";
import path from "path";
import { ContenedorProductos } from "./clases.js";
import rutas from "../routes/index.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import { schema, normalize } from "normalizr";
import daos from "../src/daos/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";


const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const listaDeMensajes = new daos.MensajeDao();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const puerto = 8081;
const expressServer = app.listen(puerto, () => {
  console.log(`El servidor se inicio en el puerto ${puerto}`);
});
const io = new Server(expressServer);

const datosDeProductos = new ContenedorProductos("productos");
datosDeProductos.newTable();

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


app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
      // No puedo usar Mongo Atlas, no estoy en mi casa y no tengo acceso a los permisos de las redes, hay un firewall en el router que no me deja conectar
      // Igualmente es solo poner la connection string de Atlas
        "mongodb://localhost:27017/cookies",
      mongoOptions,
    }),
    secret: "coderhouse",
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.all('/', async (req, res, next) => {
  if (!req.session.user) {
    return res.render("login.hbs")
  }
  return next();
});

app.use(express.static(path.join(__dirname, "../public")));


app.use((error, req, res, next) => {
  res.status(error.httpStatusCode(400)).send(error);
});

const author = new schema.Entity("author", {}, { idAttribute: "email" });

const mensaje = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "id" }
);

const schemaMensajes = new schema.Entity(
  "mensajes",
  {
    mensajes: [mensaje],
  },
  { idAttribute: "id" }
);

io.on("connection", async (socket) => {
  console.log(`Se conecto un usuario: ${socket.id}`);
  socket.emit("server:productos", await datosDeProductos.getAllProducts());
  const mensajesDb = await listaDeMensajes.getAll();
  let mensajesNor = mensajesDb.map((element, index) => {
    return {
      author: element.author,
      text: element.text,
      date: element.date,
      id: index,
    };
  });
  const normalizedPost = normalize(
    { id: "mensajes", mensajes: mensajesNor },
    schemaMensajes
  );
  const logitudNormalized = JSON.stringify(normalizedPost).length;
  const longitudOriginal = JSON.stringify(mensajesDb).length;
  const porcentajeOptimizado = (
    100 -
    (logitudNormalized * 100) / longitudOriginal
  ).toFixed(2);
  socket.emit("server:message", normalizedPost);
  socket.emit("server:porcentaje", porcentajeOptimizado)
  socket.on("client:product", async (product) => {
    await datosDeProductos.addProduct(
      product.productName,
      product.price,
      product.thumbnail
    );
    io.emit("server:productos", await datosDeProductos.getAllProducts());
  });
  socket.on("client:message", async (messageInfo) => {
    await listaDeMensajes.insert(messageInfo);
    const mensajesDb = await listaDeMensajes.getAll();
    let mensajesNor = mensajesDb.map((element, index) => {
      return {
        author: element.author,
        text: element.text,
        date: element.date,
        id: index,
      };
    });
    const normalizedPost = normalize(
      { id: "mensajes", mensajes: mensajesNor },
      schemaMensajes
    );
    const logitudNormalized = JSON.stringify(normalizedPost).length;
    const longitudOriginal = JSON.stringify(mensajesDb).length;
    const porcentajeOptimizado = (
      100 -
      (logitudNormalized * 100) / longitudOriginal
    ).toFixed(2);
    io.emit("server:message", normalizedPost);
    io.emit("server:porcentaje", porcentajeOptimizado)
  });
});

app.use("/api", rutas);
