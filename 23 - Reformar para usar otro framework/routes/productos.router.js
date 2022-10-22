import Router from "koa-router";
import productosRouter from "../controllers/productos.controller.js";

const router = new Router({
  prefix: "/productos",
});

router.get("/", productosRouter.getAllProductos);

router.get("/:id", productosRouter.getProductoById);

router.post("/", productosRouter.createProducto);

router.put("/:id", productosRouter.updateProducto);

router.delete("/:id", productosRouter.deleteProdcuto);

export default router;
