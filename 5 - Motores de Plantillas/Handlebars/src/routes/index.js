const { Router } = require('express')
const router = Router()
const { getProductos, addProducto, viewForm } = require('../controllers/productosController')

router.get('/', viewForm)
router.get('/productos', getProductos)
router.post('/productos', addProducto)
  
        
module.exports = router
        
