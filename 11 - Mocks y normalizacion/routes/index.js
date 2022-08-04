import { Router } from "express"
const router = Router()
import getProductosTest from "../controllers/productTestController.js"

router.get('/productos-test', getProductosTest)
        
export default router
