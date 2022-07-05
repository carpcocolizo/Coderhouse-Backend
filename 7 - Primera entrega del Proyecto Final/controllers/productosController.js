const { Contenedor } = require("../src/classcontenedor")

let listaDeProductos = new Contenedor("productos.txt")

const getProducts = async (req, res) => {
    try {
        res.json(await listaDeProductos.getAll())
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const getProductsById = async (req, res) => {
    try {
      const id = Number(req.params.id)
      const resultado = await listaDeProductos.getById(id)
      if (!resultado[0]) {
        res.json("{ error: producto no encontrado }")
        return
      }
      res.json(resultado)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const postProducts = async (req, res) => {
    try {
        const { nombre, descrpicion, codigo, foto, precio, stock } = req.body
        if(isNaN(Number(precio))) {
            const error = new Error('El precio tiene que ser un numero')
            error.httpStatusCode(400)
            next(error, req, res)
        }
        await listaDeProductos.save(nombre, descrpicion, codigo, foto, precio, stock)
        res.sendStatus(201)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

const putProducts = async (req, res) => {
    try {
        const id = Number(req.params.id)
        const { nombre, descrpicion, codigo, foto, precio, stock } = req.body
        if(isNaN(Number(precio))) {
            const error = new Error('El precio tiene que ser un numero')
            error.httpStatusCode(400)
            next(error, req, res)
        }
        await listaDeProductos.change(id, nombre, descrpicion, codigo, foto, precio, stock)
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}
        
const deleteProducts = async (req, res) => {
    try {
        const id = Number(req.params.id)
        await listaDeProductos.deleteById(id)
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
}

module.exports = { getProducts, getProductsById, postProducts, putProducts, deleteProducts }