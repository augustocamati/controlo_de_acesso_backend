// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
 
  production: {
    client: "pg",
    connection: process.env.PG_CONNECTION_STRING,
  
  
  },
}
