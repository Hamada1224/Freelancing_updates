// Update with your config settings.

const dotenv = require('dotenv');
const {join} = require('path');

dotenv.config({})

console.log(process.env.driver);
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const config = {

  development: {
    client: process.env.driver,
    connection: {
      "uri" : process.env.DATABASE_URL
      
    },
    
    migrations: {
      tableName: 'knex_migrations',
      "directory" : join(__dirname,'database','migrations')
    }
  },

  staging: {
    client: process.env.driver,
    connection: {
      "uri" : process.env.DATABASE_URL
    },
    
    migrations: {
      tableName: 'knex_migrations',
      "directory" : join(__dirname,'database','migrations')
    }
  },

  production: {
    client: process.env.driver,
    connection: {
      "uri" : process.env.DATABASE_URL
    },
    
    migrations: {
      tableName: 'knex_migrations',
      "directory" : join(__dirname,'database','migrations')
    }
  }

};
module.exports = config