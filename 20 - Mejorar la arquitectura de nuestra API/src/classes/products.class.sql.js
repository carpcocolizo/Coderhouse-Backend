import database from "../config/confisqlite3.js";
import { logger } from "../utils/logger.js";

class ContenedorProductos {
  constructor(tableName) {
    this.tableName = tableName;
  }

  newTable = async () => {
    try {
      const exists = await database.schema.hasTable(this.tableName);
      if (!exists) {
        await database.schema.dropTableIfExists(this.tableName);
        await database.schema.createTable(this.tableName, (tableArticle) => {
          tableArticle.increments("id").primary();
          tableArticle.string("nombre", 50).notNullable();
          tableArticle.string("precio", 50).notNullable();
          tableArticle.string("foto", 500).notNullable();
        });
        logger.log("info", "Tabla Creada con exito");
      } else {
        logger.log("info", "Tabla ya existente");
      }
    } catch (error) {
      logger.log("error", `Se encontro el siguiente error: ${error}`);
    }
  };

  addProduct = async (productToAdd) => {
    try {
      const producto = [
        {
          nombre: productToAdd.productName,
          precio: productToAdd.price,
          foto: productToAdd.thumbnail,
        },
      ];

      await database(this.tableName).insert(producto);
      logger.log("info", "Producto insertado");
    } catch (error) {
      logger.log("error", `Se encontro el siguiente error: ${error}`);
    }
  };

  getAllProducts = async () => {
    try {
      const getProducts = [];
      const allProducts = await database.from(this.tableName).select("*");
      allProducts.forEach((product) => {
        getProducts.push({
          title: product.nombre,
          price: product.precio,
          thumbnail: product.foto,
        });
      });
      return getProducts;
    } catch (error) {
      logger.log("error", `Se encontro el siguiente error: ${error}`);
    }
  };
}

export { ContenedorProductos };
