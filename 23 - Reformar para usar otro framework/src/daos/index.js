let ProductoDao;

const { default: ProductDao } = await import("./productos/productosDaosMongo.js");

ProductoDao = ProductDao

export default { ProductoDao };
