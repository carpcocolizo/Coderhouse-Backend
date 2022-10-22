import Router from "koa-router";
import productosRouter from "./productos.router.js";

const router = new Router({
  prefix: "/api",
});

router.use(productosRouter.routes());

export default router;
