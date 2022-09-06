import database from "./database.js"
import { logger } from "./logger.js";

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
        console.log("Tabla Creada con exito");
      } else {
        console.log("Tabla ya existente");
      }
    } catch (error) {
      logger.log("error", `Se encontro el siguiente error: ${error}`);
    }
  };

  addProduct = async (productName, price, thumbnail) => {
    try {
      const producto = [
        { nombre: productName, precio: price, foto: thumbnail },
      ];

      await database(this.tableName).insert(producto);
      console.log("Producto insertado");
    } catch (error) {
      logger.log("error", `Se encontro el siguiente error: ${error}`)
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
      logger.log("error", `Se encontro el siguiente error: ${error}`)
    }
  };
}



export { ContenedorProductos };
