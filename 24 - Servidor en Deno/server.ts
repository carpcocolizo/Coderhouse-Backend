import { Application, Router, Context } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

const router = new Router();

router.get("/", (ctx: Context): void => {
  const frase = ctx.request.url.searchParams.get("frase")?.split(" ").reverse().join(" ")
  ctx.response.status = 200;
  ctx.response.body = `
  <!DOCTYPE html>
  <html>
    <head><title>Desafio!</title><head>
    <body>
      <h1>${frase}</h1>
    </body>
  </html>
  `;
});

app.use(router.routes());

app.listen({ port: 8080 });

console.log("Server listening on: http://127.0.0.1:8080");
