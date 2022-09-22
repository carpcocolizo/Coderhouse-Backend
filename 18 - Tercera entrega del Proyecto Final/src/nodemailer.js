import dotenv from "dotenv";
import { createTransport } from "nodemailer";
import { logger } from "./logger.js";

dotenv.config();

const mailAdmin = process.env.MAILADMIN;
const mailNode = process.env.MAILNODE;

const transporter = createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: mailNode,
    pass: process.env.PASSGMAIL,
  },
});

async function sendEmail(asunto, infoMail) {
  try {
    const mailOptions = {
        from: "Server Node.js",
        to: mailAdmin,
        subject: asunto,
        html: infoMail,
    };
    const info = await transporter.sendMail(mailOptions);

    logger.log("info", info)
  } catch (error) {
    logger.log("error", error);
  }
}

export { sendEmail }
