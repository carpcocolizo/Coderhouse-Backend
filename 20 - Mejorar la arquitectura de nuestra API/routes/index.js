import { Router } from "express";
import apiRouter from "./api.route.js";
import authRouter from "./auth.route.js";
import infoRouter from "./info.route.js"

const router = Router();

router.use("/", authRouter)
router.use("/api/productos-test", apiRouter);
router.use("/info", infoRouter)

export default router;