import ContenedorMongo from "../../contenedores/contenedormongo.js"

class MensajeDaoMongo extends ContenedorMongo {
    constructor() {
        super("mensajes", {
            author: {type: "mixed", required: true},
            text: {type: "string", required: true},
            date: {type: "string", required: true}
        })
    }
}

export default MensajeDaoMongo