import { Router } from "express";
import { fork } from "child_process";
const routerRandom = Router();

routerRandom.get("/api/randoms", (req, res) => {
  console.log(`Usando proceso ${process.pid}`)
  let numero = Number(req.query.cant);
  if (!numero || numero < 0) {
    numero = 100000000;
  }
  const forked = fork("calculochild.js");
  forked.send(numero)
  forked.on("message", (resultado) => {
    res.json(resultado);
  })
});

export default routerRandom;
