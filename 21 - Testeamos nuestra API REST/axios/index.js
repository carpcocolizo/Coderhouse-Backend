import instance from "./axios.js";

const cookieJar = {
  myCookies: undefined,
};

const logInUser = async () => {
  try {
    const response = await instance.post("/login", {
      username: "coshita@coshita.com",
      password: "coshita",
    });
    console.log(response.data);
    cookieJar.myCookies = response.headers["set-cookie"];
  } catch (err) {
    console.log(err);
  }
};

const getProducts = async () => {
  try {
    const response = await instance.get("/api/productos", {
      headers: {
        cookie: cookieJar.myCookies,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log("error", "Hubo un error con getProductos: " + error);
  }
};

const createProduct = async () => {
  try {
    const response = await instance.post("/api/productos", {
      nombre: "Tele",
      descripcion: "muchas pulgadas",
      codigo: "TT12",
      foto: "ladetuvieja",
      precio: 12,
      stock: 500
    });
    console.log(response.data);
  } catch (error) {
    console.log("error", "Hubo un error con getProductos: " + error);
  }
};

const getByIdProducts = async () => {
  try {
    const response = await instance.get("/api/productos/6348c55722703e7b454a26ce", {    // ID SACADA DE LA BASE DE DATOS
      headers: {
        cookie: cookieJar.myCookies,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log("error", "Hubo un error con getProductos: " + error);
  }
};

const putProducts = async () => {
  try {
    const response = await instance.put("/api/productos/6348c55722703e7b454a26ce", {     // ID SACADA DE LA BASE DE DATOS
      nombre: "Tele",
      descripcion: "muchas pulgadas",
      codigo: "TT12",
      foto: "otrafoto",
      precio: 125,
      stock: 500
    });
    console.log(response.data);
  } catch (error) {
    console.log("error", "Hubo un error con getProductos: " + error);
  }
};

const deleteProducts = async () => {
  try {
    const response = await instance.delete("/api/productos/6348c55722703e7b454a26ce", {    // ID SACADA DE LA BASE DE DATOS
      headers: {
        cookie: cookieJar.myCookies,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.log("error", "Hubo un error con getProductos: " + error);
  }
};

await logInUser();
await getProducts();
//await createProduct()
//await getByIdProducts()
//await putProducts()
//await deleteProducts()
