import { faker } from "@faker-js/faker";

faker.locale = "es";

const getProductosTest = (req, res) => {
  try {
    const productos = [];

    for (let i = 1; i <= 5; i++) {
      productos.push({
        producto: faker.commerce.product(),
        precio: faker.commerce.price(),
      });
    }
    productos.map(element => {
        element.foto = faker.image.imageUrl(320, 240, element.producto, true)
    })
    res.render("main.hbs", { layout: "mostrarproductos.hbs", productos });
  } catch (error) {
    console.log("Hubo un error:" + error);
    res.sendStatus(500);
  }
};

export default getProductosTest;
