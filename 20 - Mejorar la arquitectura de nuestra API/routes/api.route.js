import { Router } from "express";
const router = Router();
import getProductosTest from "../controllers/productTestController.js";
import { checkAuthentication } from "../src/utils/aux.functions.js";

router.get("/", checkAuthentication, getProductosTest);

export default router;
