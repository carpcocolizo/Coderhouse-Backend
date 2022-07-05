const { ContenedorCarrito } = require("../src/classcarrito.js")
const { Contenedor } = require("../src/classcontenedor")

let listaDeCarritos = new ContenedorCarrito("carrito.txt")
let listaDeProductos = new Contenedor("productos.txt")

const getCarrito = async (req, res) => {
    try {
        const id = Number(req.params.id)
        res.json(await listaDeCarritos.getById(id))
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const addToCarrito = async (req, res) => {
    try {
      const id = Number(req.params.id)
      const { idproducto } = req.body
      const producto = await listaDeProductos.getById(idproducto)
      if (!producto[0]) {
        res.json("{ error: producto no encontrado }")
        return
      }
      res.json(await listaDeCarritos.addProduct(id, producto))
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const createCarrito = async (req, res) => {
    try {
        res.json(await listaDeCarritos.create())
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const deleteCarrito = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await listaDeCarritos.deleteById(id)
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}
        
const deleteFromCarrito = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const idproducto = Number(req.params.id_prod)
        await listaDeCarritos.deleteFromCarrito(id, idproducto)
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

module.exports = { getCarrito, addToCarrito, createCarrito, deleteCarrito, deleteFromCarrito }