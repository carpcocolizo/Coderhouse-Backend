import { getProducts } from "../controllers/productosController.js";
import {
  emptyCarrito,
  getCarritoNoResponse,
} from "../controllers/carritoController.js";
import { sendEmail } from "../src/utils/nodemailer.js";
import { sendSMS, sendWhataspp } from "../src/utils/twilio.js";
import { logger } from "../src/utils/logger.js";

const getFinalPrice = (carrito) => {
  let total = 0;
  carrito.forEach((item) => {
    total += item.precio;
  });
  return total;
};

const getUserData = async (req, res) => {
  try {
    const user = req.user;
    const productos = await getProducts();
    const carrito = await getCarritoNoResponse(user.carrito);
    const total = getFinalPrice(carrito);
    res.json({
      email: user.username,
      firstname: user.firstname,
      address: user.address,
      age: user.age,
      telephonenumber: user.telephonenumber,
      avatar: user.avatar,
      carrito: user.carrito,
      productos,
      carrito,
      total,
    });
  } catch (error) {
    logger.log("error", "Hubo un error:" + error)
  }
};

const submitOrder = async (req, res) => {
  try {
    const user = req.user;
    const carrito = await getCarritoNoResponse(user.carrito);
    if (carrito.length == 0) {
      res.json({ FAILED: "EL CARRITO ESTA VACIO" });
    } else {
      const asunto = `Nuevo pedido de ${user.firstname}, ${user.username}`;
      sendEmail(asunto, JSON.stringify(carrito));
      sendSMS(
        "Su pedido fue realizado con exito, el mismo se encuentra en proceso",
        user.telephonenumber
      );
      sendWhataspp(asunto);
      await emptyCarrito(user.carrito);
      res.json({ SUCCESS: "PEDIDO REALIZADO CON EXITO" });
    }
  } catch (error) {
    logger.log("error", "Hubo un error:" + error)
  }
};

export { getUserData, submitOrder }