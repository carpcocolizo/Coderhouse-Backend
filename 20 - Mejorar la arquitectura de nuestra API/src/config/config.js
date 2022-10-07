import dotenv from "dotenv";
dotenv.config();

export const config = {
  dbmongo: process.env.DBMONGO,
  secretcookie: process.env.SECRETCOOKIES
};

export default {
    mongodb: {
        connectionString : config.dbmongo
    },
}