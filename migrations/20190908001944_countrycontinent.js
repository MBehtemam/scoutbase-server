exports.up = function(knex) {
  return knex.schema.createTable("countrycontinent", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("countryId").notNull();
    t.integer("continentId").notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("countrycontinent");
};
