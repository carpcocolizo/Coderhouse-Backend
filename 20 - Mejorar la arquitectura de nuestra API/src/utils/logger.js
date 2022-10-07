import winston from "winston";
import { format } from "winston";

export const logger = winston.createLogger({
  format: format.combine(
    format.timestamp(),
    format.json(),
  ),
  transports: [
    new winston.transports.Console({ level: "info" }),
    new winston.transports.File({ filename: "warn.log", level: "warn" }),
    new winston.transports.File({ filename: "error.log", level: "error" }),
  ],
});
