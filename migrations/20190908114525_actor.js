exports.up = function(knex) {
  return knex.schema.createTable("actor", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("birthday").notNull();
    t.integer("countryId")
      .unsigned()
      .index()
      .references("id")
      .inTable("country");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("actor");
};
