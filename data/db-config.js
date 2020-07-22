//this is a helper file
const knex = require("knex");
const config = require("../knexfile.js");

module.exports = knex(config.development);
