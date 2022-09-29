import ContenedorFirebase from "../../contenedores/contenedorfirebase.js"

class ProductoDaoFirebase extends ContenedorFirebase{
    constructor() {
        super("productos")
    }
}

export default ProductoDaoFirebase