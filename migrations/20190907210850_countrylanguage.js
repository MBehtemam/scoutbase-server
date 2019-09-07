exports.up = function(knex) {
  return knex.schema.createTable("countrylanguage", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("countryId").notNull();
    t.string("languageId").notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("countrylanguage");
};
