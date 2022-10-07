import { getInfo } from "../controllers/info.controller.js";
import { Router } from "express";

const router = Router();

router.get("/", getInfo)

export default router;
