import daos from "../src/daos/index.js";

const listaDeProductos = daos.ProductoDao.getInstance();

const personasMap = {};

const createProducto = async ({ datos }) => {
  const id = await listaDeProductos.insert({
    nombre: datos.nombre,
    descripcion: datos.descripcion,
    codigo: datos.codigo,
    foto: datos.foto,
    precio: datos.precio,
    stock: datos.stock,
  });

  const nuevoProducto = await listaDeProductos.getById(id);

  return nuevoProducto[0];
};

const getProductoById = async ({ _id }) => {
  const producto = await listaDeProductos.getById(_id);
  if (!producto) throw new Error("Producto no existe");

  return producto[0];
};

const getAllProductos = async () => {
  const allProductos = await listaDeProductos.getAll();
  return allProductos;
};

const updateProducto = async ({ _id, datos }) => {
  const producto = await listaDeProductos.getById(_id);
  if (!producto) throw new Error("Producto no existe");
  await listaDeProductos.update(_id, {
    nombre: datos.nombre,
    descripcion: datos.descripcion,
    codigo: datos.codigo,
    foto: datos.foto,
    precio: datos.precio,
    stock: datos.stock,
  });
  
  const nuevoProducto = await listaDeProductos.getById(_id);
  return nuevoProducto[0];
};

const deleteProducto = async ({ _id }) => {
  const producto = await listaDeProductos.getById(_id);
  if (!producto) throw new Error("Producto no existe");
  await listaDeProductos.deleteById(_id);

  return producto[0];
};

export default {
  createProducto,
  getAllProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
};
