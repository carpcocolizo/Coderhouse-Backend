import ContenedorMongo from "../../classes/messages.class.mongo.js";

let instance;

class MensajeDaoMongo extends ContenedorMongo {
  constructor() {
    super("mensajes", {
      author: { type: "mixed", required: true },
      text: { type: "string", required: true },
      date: { type: "string", required: true },
    });
  }
  static getInstance() {
    if (!instance) {
      instance = new MensajeDaoMongo();
    }

    return instance;
  }
}

export default MensajeDaoMongo;
