import twilio from "twilio";
import dotenv from "dotenv";
import { logger } from "./logger.js";

dotenv.config();

const accounSid = process.env.TWILIOSID;
const authToken = process.env.TWILIOTOKEN;
const numberAdmin = process.env.NUMEROADMIN;
const twilioNumber = process.env.TWILONUMBER;
const message = "SOY TWILIO AMIGUITO";

const client = twilio(accounSid, authToken);

async function sendSMS(mensaje, receptor) {
  try {
    const options = {
      body: mensaje,
      from: twilioNumber,
      to: receptor,
    };

    const message = await client.messages.create(options);

    logger.log("info", message);
  } catch (error) {
    logger.log("error", error);
  }
}

async function sendWhataspp(mensaje) {
  const option = {
    body: mensaje,
    from: "whatsapp:+14155238886",
    to: `whatsapp:${numberAdmin}`,
  };

  try {
    const message = await client.messages.create(option);

    logger.log("info", message);
  } catch (error) {
    logger.log("error", error);
  }
}

export { sendSMS, sendWhataspp };
