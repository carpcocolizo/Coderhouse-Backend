import { Router } from "express";
import {
  addToCarrito,
  createCarrito,
  deleteCarrito,
  deleteFromCarrito,
  getCarrito,
} from "../controllers/carritoController.js";
import { checkAuthentication } from "../src/utils/aux.functions.js";

const router = Router();

router
  .route("/:id/productos")
  .get(checkAuthentication, getCarrito)
  .post(addToCarrito);

router.post("/", createCarrito);

router.delete("/:id", deleteCarrito);

router.delete("/:id/productos/:id_prod", deleteFromCarrito);

export default router
