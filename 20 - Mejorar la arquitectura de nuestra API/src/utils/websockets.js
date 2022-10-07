import MessagesRepository from "../classes/messages.repository.js";
import ProductsRepository from "../classes/products.repository.js";
import daos from "../daos/index.js";
import { normalizeMessage } from "./normalizr.js";

const listaDeMensajes = new MessagesRepository(daos.MensajeDao.getInstance());

const datosProductos = new ProductsRepository(daos.ProductoDao.getInstance());
datosProductos.createTable();

export default async function configSocket(socket, io) {
  socket.emit("server:productos", await datosProductos.getAll());
  const mensajesDb = await listaDeMensajes.getAll();
  const normalizacion = await normalizeMessage(mensajesDb);
  socket.emit("server:message", normalizacion.normalizedPost);
  socket.emit("server:porcentaje", normalizacion.porcentajeOptimizado);
  socket.on("client:product", async (product) => {
    await datosProductos.create(product);
    io.emit("server:productos", await datosProductos.getAll());
  });
  socket.on("client:message", async (messageInfo) => {
    await listaDeMensajes.create(messageInfo);
    const mensajesDb = await listaDeMensajes.getAll();
    const normalizacion = await normalizeMessage(mensajesDb);
    io.emit("server:message", normalizacion.normalizedPost);
    io.emit("server:porcentaje", normalizacion.porcentajeOptimizado);
  });
}
