const database = require("./database.js");
const databasesqlite = require("./databasesqlite.js");

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
      return console.log(`Salio en catch porque: ${error}`);
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
      return console.log(`Salio en catch porque: ${error}`);
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
      return console.log(`Salio en catch porque: ${error}`);
    }
  };
}

class ContenedorMensajes {
  constructor(tableName) {
    this.tableName = tableName;
  }

  newTable = async () => {
    try {
      const exists = await databasesqlite.schema.hasTable(this.tableName);
      if (!exists) {
        await databasesqlite.schema.dropTableIfExists(this.tableName);
        await databasesqlite.schema.createTable(
          this.tableName,
          (tableArticle) => {
            tableArticle.increments("id").primary();
            tableArticle.string("email", 100).notNullable();
            tableArticle.string("fecha", 100).notNullable();
            tableArticle.string("mensaje", 500).notNullable();
          }
        );
        console.log("Tabla Creada con exito");
      } else {
        console.log("Tabla ya existente");
      }
    } catch (error) {
      return console.log(`Salio en catch porque: ${error}`);
    }
  };

  saveMessage = async (email, date, message) => {
    try {
      const producto = [{ email: email, fecha: date, mensaje: message }];

      await databasesqlite(this.tableName).insert(producto);
      console.log("Mensaje guardado");
    } catch (error) {
      return console.log(`Salio en catch porque: ${error}`);
    }
  };

  getAllMessages = async () => {
    try {
      const getMessages = [];
      const allMessages = await databasesqlite.from(this.tableName).select("*");
      allMessages.forEach((message) => {
        getMessages.push({
          email: message.email,
          date: message.fecha,
          message: message.mensaje,
        });
      });
      return getMessages;
    } catch (error) {
      return console.log(`Salio en catch porque: ${error}`);
    }
  };
}

module.exports = { ContenedorProductos, ContenedorMensajes };
