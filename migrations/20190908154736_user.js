exports.up = function(knex) {
  return knex.schema.createTable("user", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("name").notNull();
    t.string("password").notNull();
    t.string("username").notNull();
    t.unique("username");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
