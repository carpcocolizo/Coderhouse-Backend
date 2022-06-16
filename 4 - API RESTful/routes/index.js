const { Router } = require('express')
const router = Router()
const productos = []

router.get('/productos', (req, res) => {
    res.json(productos)
})

router.get('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    if (productos[id - 1] == undefined ) {
        res.json("{ error: producto no encontrado }")
        return
    }
    let producto = productos[req.params.id - 1]
    res.json(producto)
})

router.post('/productos', (req, res) => {
    const { title, price, thumbnail } = req.body
    if(isNaN(Number(price))) {
        const error = new Error('El precio tiene que ser un numero')
        error.httpStatusCode(400)
        next(error, req, res)
    }
    let id = productos.length + 1
    productos.push({ title, price, thumbnail, id })

    res.sendStatus(201)
})

router.put('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const { title, price, thumbnail } = req.body
    if(isNaN(Number(price))) {
        const error = new Error('El precio tiene que ser un numero')
        error.httpStatusCode(400)
        next(error, req, res)
    }
    productos[id - 1] = ({ title, price, thumbnail, id })

    res.sendStatus(202)
})

router.delete('/productos/:id', (req, res) => {
    const id = Number(req.params.id)
    const { title, price, thumbnail } = req.body
    if(isNaN(Number(price))) {
        const error = new Error('El precio tiene que ser un numero')
        error.httpStatusCode(400)
        next(error, req, res)
    }
    productos[id - 1] = null

    res.sendStatus(202)
})

module.exports = router