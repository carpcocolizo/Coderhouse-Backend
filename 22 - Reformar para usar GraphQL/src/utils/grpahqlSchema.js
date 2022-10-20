import { buildSchema } from "graphql";

const productoSchema = buildSchema(`
    input ProductoInput {
        nombre: String,
        descripcion: String,
        codigo: String,
        foto: String,
        precio: Int,
        stock: Int,
    }

    type Producto {
        _id: ID!,
        nombre: String,
        descripcion: String,
        codigo: String,
        foto: String,
        precio: Int,
        stock: Int,
    }

    type Query {
        getProductoById(_id: ID!): Producto,
        getAllProductos: [Producto],
    }

    type Mutation {
        createProducto(datos: ProductoInput): Producto,
        updateProducto(_id: ID!, datos: ProductoInput): Producto,
        deleteProducto(_id: ID!): Producto,
    }
`);

export default productoSchema;
