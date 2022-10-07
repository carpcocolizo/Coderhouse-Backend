import User from "../models/user.model.js";


let instance;

class UserClass {
  constructor(dao) {
    this.collection = User;
  }

  async findById(username) {
    return await this.collection.findOne({ username });
  }

  async insert(newEntity) {
    return await this.collection.create(newEntity);
  }
  static getInstance() {
    if (!instance) {
      instance = new UserClass();
    }

    return instance;
  }
}

export default UserClass;
