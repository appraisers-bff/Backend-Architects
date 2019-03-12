exports.up = function(knex, Promise) {
  return knex.schema.createTable("houses", tbl => {
    tbl.increments();
    tbl.string("Address").notNullable();
    tbl.string("City", 128).notNullable();
    tbl.string("State", 2).notNullable();
    tbl.integer("Zip").notNullable();
    tbl.integer("bed").notNullable();
    tbl.integer("bath").notNullable();
    tbl.integer("sqft").notNullable();
    tbl.integer("stories").notNullable();
    tbl.integer("garage").notNullable();
    tbl.boolean("pool").notNullable();
    tbl
      .integer("user_id")
      .unsigned()
      .references("users.id");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("houses");
};
