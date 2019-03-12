// Update with your config settings.
require('dotenv').config()
const dbConnection = process.env.DATABASE_URL

module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/auth.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
  },

  production: {
    client: 'pg',
    connection: dbConnection,
    migrations: {
      tableName: 'knex_migrations',
      directory: './data/migrations',
    },
    useNullAsDefault: true,
    ssl: true
   
  }

};
