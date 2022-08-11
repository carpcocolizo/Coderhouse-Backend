const socket = io();
const productosForm = document.getElementById("productosForm");
const titleForm = document.getElementById("titleForm");
const priceForm = document.getElementById("priceForm");
const thumbnailForm = document.getElementById("thumbnailForm");
const listaProductos = document.getElementById("productos");
const messageForm = document.getElementById("messageForm");
const messagesPool = document.getElementById("messagesPool");
const emailInput = document.getElementById("emailInput");
const firstNameInput = document.getElementById("firstNameInput");
const lastNameInput = document.getElementById("lastNameInput");
const ageInput = document.getElementById("ageInput");
const usernameInput = document.getElementById("usernameInput");
const avatarInput = document.getElementById("avatarInput");
const messageInput = document.getElementById("messageInput");
const optimizacion = document.getElementById("optimizacion")


async function renderProducts(products) {
  listaProductos.innerHTML = "";
  const response = await fetch("/plantilla.hbs");
  const plantilla = await response.text();

  await products.forEach((product) => {
    const template = Handlebars.compile(plantilla);
    const html = template(product);
    listaProductos.innerHTML += html;
  });
}

function loadProduct(productInfo) {
  socket.emit("client:product", productInfo);
}

function submitHandler(event) {
  event.preventDefault();
  const productInfo = {
    productName: titleForm.value,
    price: priceForm.value,
    thumbnail: thumbnailForm.value,
  };
  loadProduct(productInfo);
}

productosForm.addEventListener("submit", submitHandler);

function sendMessage(messageInfo) {
  socket.emit("client:message", messageInfo);
}

async function renderMessages(messagesInfo) {
  messagesPool.innerHTML = "";
  const response = await fetch("/plantillamensajes.hbs");
  const plantilla = await response.text();
  const denormalizado = normalizr.denormalize(
    messagesInfo.result,
    schemaMensajes,
    messagesInfo.entities
  );
  await denormalizado.mensajes.forEach((message) => {
    const template = Handlebars.compile(plantilla);
    const html = template(message);
    messagesPool.innerHTML += html;
  });
}

function renderOptimizacion(porcentaje) {
  optimizacion.innerHTML = `Porcentaje de optimizacion: ${porcentaje}`
}

function submitHandlerMessage(event) {
  event.preventDefault();
  const messageInfo = {
    author: {
      email: emailInput.value,
      nombre: firstNameInput.value,
      apellido: lastNameInput.value,
      edad: ageInput.value,
      alias: usernameInput.value,
      avatar: avatarInput.value,
    },
    text: messageInput.value,
    date: new Date()
  };
  sendMessage(messageInfo);
}

messageForm.addEventListener("submit", submitHandlerMessage);

socket.on("server:message", (messageInfo) => {
  if (messageInfo == null) {
    console.log("no hay mensajes");
  } else {
    renderMessages(messageInfo);
  }
});

socket.on("server:productos", (productos) => {
  if (productos == null) {
    console.log("No hay productos cargados");
  } else {
    renderProducts(productos);
  }
});

socket.on("server:porcentaje", (porcentaje) => {
  if (porcentaje == null) {
    console.log("no hay mensajes");
  } else {
    renderOptimizacion(porcentaje)
  }
});