import express from "express";
import { Server } from "socket.io";
import path from "path";
import { ContenedorProductos } from "./clases.js";
import rutas from "../routes/index.js";
import rutasRandom from "../routes/random.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { engine } from "express-handlebars";
import { schema, normalize } from "normalizr";
import daos from "../src/daos/index.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import User from "./models/models.js"
import bcrypt from "bcrypt"
import passport from "passport"
import LocalPass from "passport-local"
import { config } from "./config.js";
import yargs from "yargs"
import util from "util"
const LocalStrategy = LocalPass.Strategy

const args = yargs(process.argv.slice(2)).alias({p: "puerto"}).default({puerto: 8080}).argv;

function hashPassword(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

function isValidPassword(plainPassword, hashedPassword) {
  return bcrypt.compareSync(plainPassword, hashedPassword);
}

const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const listaDeMensajes = new daos.MensajeDao();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const puerto = args.p;
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
        config.dbcookies,
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

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(passport.initialize());
app.use(passport.session());

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await User.findOne({ username });

      if (existingUser) {
        return done(null, null);
      }

      const newUser = {
        username,
        password: hashPassword(password)
      };

      const createdUser = await User.create(newUser);

      done(null, createdUser);
    } catch (err) {
      console.log("Error registrando usuario", err);
      done("Error en registro", null);
    }
  }
);

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username });

    if (!user || !isValidPassword(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (err) {
    console.log("Error login", err);
    done("Error login", null);
  }
});

passport.use("register", registerStrategy);
passport.use("login", loginStrategy);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});


app.all('/', async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.render("login.hbs")
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/login", (req, res) => {
  res.render("login.hbs")  
});

app.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
  var user = req.user;
  res.render("main.hbs", { nombre: user.username});
});

app.get("/register", (req, res) => {
  res.render("register.hbs")  
});


app.post("/register", passport.authenticate("register", { failureRedirect: "/failsignup" }), (req, res) => {
  var user = req.user;
  res.render("login.hbs");
});

app.get("/faillogin", (req, res) => {
  res.render("faillogin.hbs")  
});
app.get("/failsignup", (req, res) => {
  res.render("failregister.hbs")  
});

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

app.use("/", rutas);

const info = {
  argumentos: JSON.stringify(args),
  path: process.execPath,
  os: process.platform,
  processid: process.pid,
  nodev: process.version,
  folder: process.cwd(),
  memoria: util.inspect(process.memoryUsage())
}

app.get("/info", (req, res) => {
  res.render("info.hbs", {info})
})

app.use("/", rutasRandom);