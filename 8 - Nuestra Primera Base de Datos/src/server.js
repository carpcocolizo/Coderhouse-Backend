const express = require("express");
const app = express();
const { Server: IOServer } = require("socket.io");
const path = require("path");
const puerto = 8080;
const expressServer = app.listen(puerto, () => {
  console.log(`El servidor se inicio en el puerto ${puerto}`);
});
const io = new IOServer(expressServer);
const { ContenedorProductos, ContenedorMensajes } = require("./clases");

const baseDeMensajes = new ContenedorMensajes("messages");
const datosDeProductos = new ContenedorProductos("productos");
datosDeProductos.newTable()
baseDeMensajes.newTable()

app.use(express.static(path.join(__dirname, "../public")));

app.use((error, req, res, next) => {
  res.status(error.httpStatusCode(400)).send(error);
});

io.on("connection", async (socket) => {
  console.log(`Se conecto un usuario: ${socket.id}`);
  socket.emit("server:productos", await datosDeProductos.getAllProducts());
  socket.emit(
    "server:message",
    await baseDeMensajes.getAllMessages()
  );
  socket.on("client:product", async (product) => {
    await datosDeProductos.addProduct(
      product.productName,
      product.price,
      product.thumbnail
    );
    io.emit("server:productos", await datosDeProductos.getAllProducts());
  });
  socket.on("client:message", async (messageInfo) => {
    await baseDeMensajes.saveMessage(
      messageInfo.email,
      messageInfo.date,
      messageInfo.message
    );
    io.emit(
      "server:message",
      await baseDeMensajes.getAllMessages()
    );
  });
});
