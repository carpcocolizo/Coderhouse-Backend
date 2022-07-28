import daos from "../src/daos/index.js"
import listaDeProductos from "./productosController.js"

const listaDeCarritos = new daos.CarritoDao()
//const listaDeProductos = new daos.ProductoDao()

//import { ContenedorCarrito } from "../src/classcarrito.js"
//import { Contenedor } from "../src/classcontenedor.js"
//
//let listaDeCarritos = new ContenedorCarrito("carrito.txt")
//let listaDeProductos = new Contenedor("productos.txt")

const getCarrito = async (req, res) => {
    try {
        const id = req.params.id
        const response = await listaDeCarritos.getById(id)
        if (!response) {
            res.json("{ error: carrito no encontrado }")
            return
        }
        res.json(response)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const addToCarrito = async (req, res) => {
    try {
      const id = req.params.id
      const { idproducto } = req.body
      const producto = await listaDeProductos.getById(idproducto)
      if (!producto) {
        res.json("{ error: producto no encontrado }")
        return
      }
      res.json(await listaDeCarritos.push(id, producto))
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const createCarrito = async (req, res) => {
    try {
        const timestamp = Date.now()
        const productos = []
        res.json(await listaDeCarritos.insert({timestamp, productos }))
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const deleteCarrito = async (req, res) => {
    try {
        const id = req.params.id
        await listaDeCarritos.deleteById(id)
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}
        
const deleteFromCarrito = async (req, res) => {
    try {
        const id = req.params.id
        const idproducto = req.params.id_prod
        await listaDeCarritos.deleteFromCarrito(id, idproducto)
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

export { getCarrito, addToCarrito, createCarrito, deleteCarrito, deleteFromCarrito }