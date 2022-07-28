import { Router } from "express"
import { getProducts, getProductsById, postProducts, putProducts, deleteProducts } from "../controllers/productosController.js"
import { getCarrito, addToCarrito, createCarrito, deleteCarrito, deleteFromCarrito } from "../controllers/carritoController.js"
const router = Router()
const isAdmin = true

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
        
export default router
