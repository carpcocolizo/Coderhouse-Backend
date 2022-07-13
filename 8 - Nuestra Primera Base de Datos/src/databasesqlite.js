const knex = require('knex')
const path = require("path")

const configSQLite3 = {
  client: "sqlite3",
  connection: { filename: path.resolve(__dirname, "./db/ecommerce.sqlite") },
  useNullAsDefault: true
}

const databaseConnection = knex(configSQLite3)

module.exports = databaseConnection