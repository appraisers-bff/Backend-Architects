exports.up = function(knex, Promise) {
  return knex.schema.createTable("houses", tbl => {
    tbl.increments();
    tbl.string("address").notNullable();
    tbl.string("city", 128).notNullable();
    tbl.string("state", 2).notNullable();
    tbl.integer("zip").notNullable();
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
