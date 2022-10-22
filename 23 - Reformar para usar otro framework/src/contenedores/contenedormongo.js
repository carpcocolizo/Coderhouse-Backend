import mongoose from "mongoose";
import config from "../config/config.js";
import { logger } from "../utils/logger.js";

mongoose.connect(config.mongodb.connectionString);
logger.log("info","Conectado a la base de datos de MONGO");

class ContenedorMongo {
  constructor(collectionName, schema) {
    this.collection = mongoose.model(collectionName, schema);
  }

  insert = async (document) => {
    try {
      const doc = await this.collection.insertMany(document);
      return doc[0]._id;
    } catch (error) {
      logger.log("error", "Hubo un error:" + error)
    }
  };

  getAll = async () => {
    try {
      const doc = await this.collection.find({}, { __v: 0 }).lean();
      return doc;
    } catch (error) {
      logger.log("error", "Hubo un error:" + error)
    }
  };

  getById = async (id) => {
    try {
      const doc = await this.collection.find({ _id: id });
      if (doc == "") {
        return null;
      } else if (doc[0].productos) {
        return doc[0].productos;
      }
      return doc;
    } catch (error) {
      logger.log("error", "Hubo un error:" + error)
    }
  };

  update = async (id, document) => {
    try {
      const doc = await this.collection.updateOne(
        { _id: id },
        {
          $set: document,
        }
      );
      return doc;
    } catch (error) {
      logger.log("error", "Hubo un error:" + error)
    }
  };

  deleteById = async (id) => {
    try {
      const doc = await this.collection.deleteOne({ _id: id });
      return doc;
    } catch (error) {
      logger.log("error", "Hubo un error:" + error)
    }
  };
}

export default ContenedorMongo;