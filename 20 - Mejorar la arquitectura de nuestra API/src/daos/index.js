let MensajeDao;
let ProductoDao;

const { default: MensajesDaoMongo } = await import(
  "./mensajes/mensajesDaos.js"
);

const { default: ProductDaoSql } = await import("./productos/productosDaos.js");

MensajeDao = MensajesDaoMongo;
ProductoDao = ProductDaoSql;

export default { MensajeDao, ProductoDao };
