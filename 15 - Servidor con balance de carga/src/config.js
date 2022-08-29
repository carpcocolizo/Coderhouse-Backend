import dotenv from "dotenv";
dotenv.config();

export const config = {
  dbcookies: process.env.DBCOOKIES,
  dbmessages: process.env.DBMESSAGES,
  secretcookie: process.env.SECRETCOOKIES
};

export default {
    mongodb: {
        connectionString : config.dbmessages
    },
}