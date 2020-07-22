//this is a helper file
const knex = require("knex");

const config = require("../knexfile.js");
//importing a configured instance of knex
module.exports = knex(config.development);
