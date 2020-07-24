exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    //the change we want to make to our schema of a table 'cars'
    tbl.increments("id"); //primary key
    tbl.string("vin", 17).unique().notNullable();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("transmission_type", 128).defaultTo("not specified");
    tbl.string("status_title", 128).defaultTo("clean");
  });
};

exports.down = function (knex) {
  //undoing that change, uncreate the table 'cars'
  return knex.schema.dropTableIfExists("cars");
};
