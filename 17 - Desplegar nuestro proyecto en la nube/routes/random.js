import { Router } from "express";
//import { fork } from "child_process";
const routerRandom = Router();

//routerRandom.get("/api/randoms", (req, res) => {
//  console.log(`Usando proceso ${process.pid}`)
//  let numero = Number(req.query.cant);
//  if (!numero || numero < 0) {
//    numero = 100000000;
//  }
//  const forked = fork("calculochild.js");
//  forked.send(numero)
//  forked.on("message", (resultado) => {
//    res.json(resultado);
//  })
//});

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

routerRandom.get("/api/randoms", (req, res) => {
  console.log(`Usando proceso ${process.pid}`)
  let numero = Number(req.query.cant);
  if (!numero || numero < 0) {
    numero = 100000000;
  }
  res.json(calculo(numero))
});

export default routerRandom;
