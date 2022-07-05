const express = require('express')
const app = express()
const { Router, application } = require('express')
const router = Router()
const { getProducts, getProductsById, postProducts, putProducts, deleteProducts } = require("../controllers/productosController")
const { getCarrito, addToCarrito, createCarrito, deleteCarrito, deleteFromCarrito } = require("../controllers/carritoController")
const isAdmin = false

function checkAdmin(req, res, next) {
    if (isAdmin) {
        return next()
    } else {
        res.json({ error : -1, descripcion: `ruta ${req.path} método ${req.method} no autorizada`})
    }
}

router.get('/productos', getProducts)

router.get('/productos/:id', getProductsById)

router.post('/productos', checkAdmin, postProducts)
        
router.put('/productos/:id', checkAdmin, putProducts)
        
router.delete('/productos/:id', checkAdmin, deleteProducts)

router.get('/carrito/:id/productos', getCarrito)

router.post('/carrito/:id/productos', addToCarrito)

router.post('/carrito', createCarrito)
        
router.delete('/carrito/:id', deleteCarrito)
        
router.delete('/carrito/:id/productos/:id_prod', deleteFromCarrito)
        
module.exports = router
