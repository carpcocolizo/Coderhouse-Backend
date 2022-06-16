const { Router } = require('express')
const router = Router()
const productos = []

router.get('/productos', (req, res) => {
    try {
        res.json(productos)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
})

router.get('/productos/:id', (req, res) => {
    try {
      const id = Number(req.params.id)
      if (productos[id - 1] == undefined ) {
          res.json("{ error: producto no encontrado }")
          return
      }
      let producto = productos[req.params.id - 1]
      res.json(producto)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
})

router.post('/productos', (req, res) => {
    try {
        const { title, price, thumbnail } = req.body
        if(isNaN(Number(price))) {
            const error = new Error('El precio tiene que ser un numero')
            error.httpStatusCode(400)
            next(error, req, res)
        }
        let id = productos.length + 1
        res.sendStatus(201)
        productos.push({ title, price, thumbnail, id })
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
})
        
        

router.put('/productos/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const { title, price, thumbnail } = req.body
        if(isNaN(Number(price))) {
            const error = new Error('El precio tiene que ser un numero')
            error.httpStatusCode(400)
            next(error, req, res)
        }
        productos[id - 1] = ({ title, price, thumbnail, id })
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
})
        
        

router.delete('/productos/:id', (req, res) => {
    try {
        const id = Number(req.params.id)
        const { title, price, thumbnail } = req.body
        if(isNaN(Number(price))) {
            const error = new Error('El precio tiene que ser un numero')
            error.httpStatusCode(400)
            next(error, req, res)
        }
        productos[id - 1] = null
        res.sendStatus(202)
    } catch(error) {
        console.log("Hubo un error:" + error)
        res.sendStatus(500)
    }
})
        
module.exports = router
        
