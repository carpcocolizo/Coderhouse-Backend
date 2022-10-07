import { logger } from "../utils/logger.js";
import CustomError from "./CustomError.class.js";

class MessagesRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async getAll() {
    try {
      return await this.dao.getAll();
    } catch (error) {
      logger.log("error", error);
      throw new CustomError(500, "Error getting messages");
    }
  }

  async create(newEntity) {
    try {
      return await this.dao.insert(newEntity);
    } catch (error) {
      logger.log("error", error);
      throw new CustomError(500, "Error creating message");
    }
  }

}

export default MessagesRepository;
