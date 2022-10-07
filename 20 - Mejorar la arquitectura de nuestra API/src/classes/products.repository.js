import { logger } from "../utils/logger.js";
import CustomError from "./CustomError.class.js";

class ProductsRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async createTable() {
    try {
      return await this.dao.newTable();
    } catch (error) {
      logger.log("error", error);
      throw new CustomError(500, "Error creating table");
    }
  }

  async getAll() {
    try {
      return await this.dao.getAllProducts();
    } catch (error) {
      logger.log("error", error);
      throw new CustomError(500, "Error getting products");
    }
  }

  async create(newEntity) {
    try {
      return await this.dao.addProduct(newEntity);
    } catch (error) {
      logger.log("error", error);
      throw new CustomError(500, "Error creating products");
    }
  }
}

export default ProductsRepository;
