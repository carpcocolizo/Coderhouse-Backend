import { ContenedorProductos } from "../../classes/products.class.sql.js";

let instance;

class ProductDaoSql extends ContenedorProductos {
  constructor() {
    super("productos");
  }
  static getInstance() {
    if (!instance) {
      instance = new ProductDaoSql();
    }

    return instance;
  }
}

export default ProductDaoSql;
