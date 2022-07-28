import ContenedorMongo from "../../contenedores/contenedormongo.js"

class CarritoDaoMongo extends ContenedorMongo {
    constructor() {
        super("carritos", {
            timestamp : {type: "String", required: true},
            productos: {type: "Mixed", default: [], required: true},
        })
    }
}

export default CarritoDaoMongo