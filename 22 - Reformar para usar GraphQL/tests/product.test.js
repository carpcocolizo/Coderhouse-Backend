import { expect } from "chai";
import supertest from "supertest";
import listaDeProductos from "../controllers/productosController.js";
import config from "../src/config/config.js";

let request;
let cookies;

describe("Testing product routes", () => {
  before(async () => {
    request = supertest("http://localhost:8080");

    const response = await request
      .post("/login")
      .send({ username: config.usernameTest, password: config.passwordTest }); // Cambiar por usuario en base de datos

    cookies = response.headers["set-cookie"][0].split(";")[0];
    console.log(cookies);
  });

  describe("- POST /api/productos", () => {
    const productToCreate = {
      nombre: "Una Tele",
      descripcion: "muchas pulgadas",
      codigo: "TT12",
      foto: "fotodetele.jpg",
      precio: 12,
      stock: 500,
    };
    let response;

    it("Should return 201", async () => {
      response = await request
        .post("/api/productos")
        .set("cookie", cookies)
        .send(productToCreate);

      expect(response.status).to.eql(201);
    });

    it("Should return the created product", () => {
      expect(response.body.nombre).to.eql(productToCreate.nombre);
      expect(response.body.descripcion).to.eql(productToCreate.descripcion);
      expect(response.body.codigo).to.eql(productToCreate.codigo);
      expect(response.body.foto).to.eql(productToCreate.foto);
      expect(response.body.precio).to.eql(Number(productToCreate.precio));
      expect(response.body.stock).to.eql(Number(productToCreate.stock));
    });
  });

  describe("- GET /api/productos", async () => {
    let response;

    it("Should return a status 200", async () => {
      response = await request.get("/api/productos").set("cookie", cookies);
      expect(response.status).to.eql(200);
    });

    it("Should return a json with all products", async () => {
      const allProducts = JSON.stringify(await listaDeProductos.getAll());
      response = await request.get("/api/productos").set("cookie", cookies);
      expect(response.body).to.eql(JSON.parse(allProducts));
    });
  });

  describe("- GET /api/productos/:id", () => {
    let response;

    it("Should return a status 200", async () => {
        response = await request.get(`/api/productos/${config.productId}`).set("cookie", cookies);
        expect(response.status).to.eql(200);
      });
  

    it("Should return the requested product", async () => {
      const product = JSON.stringify(await listaDeProductos.getById(config.productId))
      expect(response.body).to.eql(JSON.parse(product));
    });
  });

  describe("- PUT /api/productos/:id", () => {
    const putProduct = {
        nombre: "Una Tele grande",
        descripcion: "muchas pulgadas",
        codigo: "TT12",
        foto: "fotodetelegrande.jpg",
        precio: 125,
        stock: 5003,
      };
    let response;

    it("Should return a status 202", async () => {
        response = await request.put(`/api/productos/${config.productId}`).set("cookie", cookies).send(putProduct);
        expect(response.status).to.eql(202);
      });
  

    it("Should return the requested product", async () => {
      expect(response.body.nombre).to.eql(putProduct.nombre);
      expect(response.body.descripcion).to.eql(putProduct.descripcion);
      expect(response.body.codigo).to.eql(putProduct.codigo);
      expect(response.body.foto).to.eql(putProduct.foto);
      expect(response.body.precio).to.eql(Number(putProduct.precio));
      expect(response.body.stock).to.eql(Number(putProduct.stock));
    });
  });

  describe("- DELETE /api/productos/:id", () => {
    let response;

    it("Should return a status 202", async () => {
        response = await request.delete(`/api/productos/${config.productId}`).set("cookie", cookies)
        expect(response.status).to.eql(202);
      });
  });

});
