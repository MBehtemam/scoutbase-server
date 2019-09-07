exports.up = function(knex) {
  return knex.schema.createTable("continent", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("code").notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("continent");
};
