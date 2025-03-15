// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './src/database/dev.sqlite3',
      
    }, 
     useNullAsDefault: true,
     seeds: {
      directory: './src/database/seeds/',
    },
    migrations:{
      directory: './src/database/migrations',
    }
    
  },

  staging: {
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
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
     
      database: 'neondb',
      user:     'neondb_owner',
      password: 'npg_HOT5Jw9jeniR'
    },
     useNullAsDefault: true,
     seeds: {
      directory: './src/database/seeds/',
    },
   
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
       directory: './src/database/migrations',
      tableName: 'knex_migrations'
    }
  }

};
