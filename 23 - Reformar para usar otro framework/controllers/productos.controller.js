import ProductoDaoMongo from "../src/daos/productos/productosDaosMongo.js";

const productos = ProductoDaoMongo.getInstance();

const getProductoById = async (ctx) => {
  const { id } = ctx.params;
  const currentProducto = await productos.getById(id);
  if (currentProducto) {
    ctx.body = {
      status: "Success",
      data: currentProducto[0],
    };
  } else {
    ctx.response.status = 404;
    ctx.body = {
      status: "Not found",
      message: `Book with ID: ${id} not found`,
    };
  }
};

const createProducto = async (ctx) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body;

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter all the required data",
    };
  } else {
    const createdProducto = await productos.insert({
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });

    ctx.response.status = 201;
    ctx.body = {
      status: "Created!",
      data: {id: {createdProducto}, datos: { nombre, descripcion, codigo, foto, precio, stock }},
    };
  }
};

const updateProducto = async (ctx) => {
  const { nombre, descripcion, codigo, foto, precio, stock } = ctx.request.body;

  if (!nombre || !descripcion || !codigo || !foto || !precio || !stock) {
    ctx.response.status = 400;
    ctx.body = {
      status: "Missing data",
      message: "Please enter all the required data",
    };
  } else {
    const { id } = ctx.params;
    await productos.update(id, {
      nombre,
      descripcion,
      codigo,
      foto,
      precio,
      stock,
    });
    ctx.response.status = 201;
    ctx.body = {
      status: "Updated!",
      data: { nombre, descripcion, codigo, foto, precio, stock },
    };
  }
};

const deleteProdcuto = async (ctx) => {
  const { id } = ctx.params;
  const deletedProducto = await productos.deleteById(id);

  ctx.response.status = 200;
  ctx.body = {
    status: "Deleted!",
    data: deletedProducto,
  };
};

const getAllProductos = async (ctx) => {
  const allProductos = await productos.getAll();

  ctx.response.status = 200;
  ctx.body = {
    status: "Success",
    data: allProductos,
  };
};

export default {
  getProductoById,
  createProducto,
  updateProducto,
  deleteProdcuto,
  getAllProductos,
};
