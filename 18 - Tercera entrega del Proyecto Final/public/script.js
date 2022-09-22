const listaProductos = document.getElementById("productos");
const productosRow = document.getElementById("productosrow");
const firstname = document.getElementById("nombre");
const address = document.getElementById("address");
const age = document.getElementById("age");
const phonenumber = document.getElementById("phonenumber");
const email = document.getElementById("email");
const profilePicture = document.getElementById("profilepicture");
const total = document.getElementById("total");
const carrito = document.getElementById("carrito");
const listacarrito = document.getElementById("listacarrito");
const submitOrder = document.getElementById("submitorder");

function submitOrderHandler(event) {
  location.href = "/submitorder";
}

submitOrder.addEventListener("click", submitOrderHandler);

async function updateUserData(objeto) {
  firstname.innerHTML = objeto.firstname;
  address.innerHTML = objeto.address;
  age.innerHTML = objeto.age;
  phonenumber.innerHTML = objeto.telephonenumber;
  email.innerHTML = objeto.email;
  total.innerHTML = `$${objeto.total}`;
  profilePicture.innerHTML = `<img src="./upload/${objeto.avatar}" alt="Profile picture" width="100" height="100"></img>`;
}

async function updateProducts(objeto) {
  const getPlantilla = await fetch("/plantilla.hbs");
  const plantilla = await getPlantilla.text();
  if (!objeto.productos.length == 0) {
    await objeto.productos.forEach((product) => {
      const template = Handlebars.compile(plantilla);
      const html = template(product);
      productosRow.innerHTML += html;
    });
  } else {
    listaProductos.innerHTML = "No hay productos";
  }
}

async function updateCart(objeto) {
  const getPlantillaCarrito = await fetch("/plantillacarrito.hbs");
  const plantillaCarrito = await getPlantillaCarrito.text();

  if (!objeto.carrito.length == 0) {
    await objeto.carrito.forEach((product) => {
      const template = Handlebars.compile(plantillaCarrito);
      const html = template(product);
      listacarrito.innerHTML += html;
    });
  } else {
    carrito.innerHTML = `<h3>No hay productos en el carrito</h3>`;
  }
}

function redireccionar(pagina) {
  location.href = pagina;
}

async function renderUser() {
  try {
    const response = await fetch("/main");
    const objeto = await response.json();
    updateUserData(objeto);
    updateProducts(objeto);
    updateCart(objeto);
  } catch {
    redireccionar("/login");
  }
}

renderUser();
