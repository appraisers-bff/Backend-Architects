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
    tbl.integer("year").notNullable();
    tbl.integer("fmv");
    tbl.integer("zestimate");

    tbl.integer("user_id")
      .unsigned()
      .references("id")
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("houses");
};
