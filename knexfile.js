// Update with your config settings.

const dotenv = require('dotenv');
const {join} = require('path');

dotenv.config({
  "path" : join(__dirname,'.env')
})

console.log(process.env.driver);
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {

  development: {
    client: process.env.driver,
    connection: {
      database: process.env.database,
      user:     process.env.username,
      password: process.env.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      "directory" : join(__dirname,'database','migrations')
    }
  },

  staging: {
    client: process.env.driver,
    connection: {
      database: process.env.database,
      user:     process.env.username,
      password: process.env.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      "directory" : join(__dirname,'database','migrations')
    }
  },

  production: {
    client: process.env.driver,
    connection: {
      database: process.env.database,
      user:     process.env.username,
      password: process.env.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      "directory" : join(__dirname,'database','migrations')
    }
  }

};
module.exports = config