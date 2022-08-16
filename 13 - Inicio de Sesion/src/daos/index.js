let MensajeDao;

const { default: MensajesDaoMongo } = await import(
  "./mensajes/mensajesDaos.js"
);

MensajeDao = MensajesDaoMongo;
export default { MensajeDao };
