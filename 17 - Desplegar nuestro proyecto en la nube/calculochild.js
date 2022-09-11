function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const arrayNumeros = [];
let objetoNumeros = {};

function calculo(numero) {
  for (let i = 0; i < numero; i++) {
    arrayNumeros.push(getRandomInt(1, 1000));
  }
  arrayNumeros.forEach((n) => {
    if (!objetoNumeros[n]) {
      objetoNumeros[n] = 1;
    } else {
      objetoNumeros[n] += 1;
    }
  });
  return objetoNumeros
}

process.on("message", (numero) => {
    let resultado = calculo(numero)
    process.send(resultado)
})