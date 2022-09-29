import { Router } from "express";
import productRouter from "./product.route.js";
import authRouter from "./auth.route.js";
import cartRouter from "./cart.route.js"

const router = Router();

router.use("/", authRouter)
router.use("/api/productos", productRouter);
router.use("/api/carrito", cartRouter)

export default router;