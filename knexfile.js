// Update with your config settings.
require('dotenv').config()

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
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
   
  }

};
