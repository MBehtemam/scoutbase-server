exports.up = function(knex) {
  return knex.schema.createTable("language", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("code").notNull();
    t.string("native").notNull();
    t.unique("code");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("language");
};
