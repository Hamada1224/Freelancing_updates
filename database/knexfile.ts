import type { Knex } from "knex";
import { config as dotenv } from "dotenv"
import {join} from "path"

dotenv({
	path : join(__dirname,'../','.env')
})



// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: process.env.driver,
    connection: {
      database: process.env.database,
      user: process.env.username,
      password: process.env.password
    }
  },
  staging: {
    client: process.env.driver,
    connection: {
      database: process.env.database,
      user: process.env.username,
      password: process.env.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },
  production: {
    client: process.env.driver,
    connection: {
      database: process.env.database,
      user: process.env.username,
      password: process.env.password
    },
  pool: {
      min: 2,
      max: 10
    },
  migrations: {
      tableName: "knex_migrations"
    }
  },


};

export default config;
