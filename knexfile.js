// Update with your config settings.

module.exports = {
  //knex configuration
  development: {
    client: "sqlite3", //what db managment system we are using
    connection: {
      // filename: "./data/cars.db3",
      filename: "./data/car-dealer.db3", //where we can find db
      //./data/car-dealer.db3 - here all of our data is being stored
      //for interacting with this file we are using knexfile.js
    },
    useNullAsDefault: true, //default object
    migrations: {
      directory: "./data/migrations",
    },
    seeds: {
      directory: "./data/seeds",
    },
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
