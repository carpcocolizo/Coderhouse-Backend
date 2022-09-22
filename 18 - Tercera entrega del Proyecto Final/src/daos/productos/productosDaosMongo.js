import ContenedorMongo from "../../contenedores/contenedormongo.js"

class ProductoDaoMongo extends ContenedorMongo {
    constructor() {
        super("productos", {
            nombre: {type: "string", required: true},
            descripcion: {type: "string", required: true},
            codigo: {type: "string", required: true},
            foto: {type: "string", required: true},
            precio: {type: "Number", required: true},
            stock: {type: "Number", required: true},
        })
    }
}

export default ProductoDaoMongo