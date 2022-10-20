import { Router } from "express";
import {
  getProductsResponse,
  getProductsById,
  postProducts,
  putProducts,
  deleteProducts,
} from "../controllers/productosController.js";
import { checkAuthentication } from "../src/utils/aux.functions.js";
import { checkAdmin } from "../src/utils/aux.functions.js";
const router = Router();

router
  .route("/")
  .get(checkAuthentication, getProductsResponse)
  .post(checkAdmin, postProducts);

router
  .route("/:id")
  .get(checkAuthentication, getProductsById)
  .put(checkAdmin, putProducts)
  .delete(checkAdmin, deleteProducts);

export default router;
