//import knex from'knex'
//const config = {
//  client: "mysql",
//  connection: {
//    host: "127.0.0.1",
//    user: "root",
//    password: "",
//    database: "ecommerce",
//  },
//  pool: { min: 0, max: 7 },
//}
//
//const databaseConnection = knex(config)
//
//export default databaseConnection

import knex from "knex"
import path from "path"
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const configSQLite3 = {
  client: "sqlite3",
  connection: { filename: path.resolve(__dirname, "./db/ecommerce.sqlite") },
  useNullAsDefault: true
}

const databaseConnection = knex(configSQLite3)

export default databaseConnection