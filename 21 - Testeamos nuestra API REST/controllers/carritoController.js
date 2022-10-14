import daos from "../src/daos/index.js"
import { logger } from "../src/utils/logger.js"
import listaDeProductos from "./productosController.js"

const listaDeCarritos = new daos.CarritoDao()

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
        logger.log("error", "Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const getCarritoNoResponse = async (id) => {
    try {
      const data = await listaDeCarritos.getById(id)
      return data
    } catch(error) {
        logger.log("error", "Hubo un error:" + error)
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
        logger.log("error", "Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const createCarrito = async (req, res) => {
    try {
        const timestamp = Date.now()
        const productos = []
        await listaDeCarritos.insert({timestamp, productos })
        return res.json(await listaDeCarritos.insert({timestamp, productos })) 
    } catch(error) {
        logger.log("error", "Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const createCarritoOnPage = async () => {
    try {
        const timestamp = Date.now()
        const productos = []
        await listaDeCarritos.insert({timestamp, productos })
        const carritoId = await listaDeCarritos.returnId(timestamp)
        return carritoId
    } catch(error) {
        logger.log("error", "Hubo un error:" + error)
    }
}

const deleteCarrito = async (req, res) => {
    try {
        const id = req.params.id
        await listaDeCarritos.deleteById(id)
        res.sendStatus(202)
    } catch(error) {
        logger.log("error", "Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const emptyCarrito = async (id) => {
    try {
      await listaDeCarritos.emptyCart(id)
    } catch(error) {
        logger.log("error", "Hubo un error:" + error)
    }
}
        
const deleteFromCarrito = async (req, res) => {
    try {
        const id = req.params.id
        const idproducto = req.params.id_prod
        await listaDeCarritos.deleteFromCarrito(id, idproducto)
        res.sendStatus(202)
    } catch(error) {
        logger.log("error", "Hubo un error:" + error)
        res.sendStatus(500)
    }
}

export { getCarrito, getCarritoNoResponse, addToCarrito, createCarrito, deleteCarrito, deleteFromCarrito, emptyCarrito, createCarritoOnPage }