import { schema, normalize } from "normalizr";

const author = new schema.Entity("author", {}, { idAttribute: "email" });

const mensaje = new schema.Entity(
  "mensaje",
  { author: author },
  { idAttribute: "id" }
);

const schemaMensajes = new schema.Entity(
  "mensajes",
  {
    mensajes: [mensaje],
  },
  { idAttribute: "id" }
);

async function normalizeMessage(mensajesDb) {
  let mensajesNor = mensajesDb.map((element, index) => {
    return {
      author: element.author,
      text: element.text,
      date: element.date,
      id: index,
    };
  });
  const normalizedPost = normalize(
    { id: "mensajes", mensajes: mensajesNor },
    schemaMensajes
  );
  const logitudNormalized = JSON.stringify(normalizedPost).length;
  const longitudOriginal = JSON.stringify(mensajesDb).length;
  const porcentajeOptimizado = (
    100 -
    (logitudNormalized * 100) / longitudOriginal
  ).toFixed(2);
  return { normalizedPost, porcentajeOptimizado }
}

export { normalizeMessage };
