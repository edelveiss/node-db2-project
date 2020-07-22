exports.up = function (knex) {
  return knex.schema.createTable("cars", (tbl) => {
    tbl.increments("id"); //primary key
    tbl.string("vin", 17).unique().notNullable();
    tbl.string("make").notNullable();
    tbl.string("model").notNullable();
    tbl.decimal("mileage").notNullable();
    tbl.string("transmission_type");
    tbl.string("status_title");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("cars");
};
