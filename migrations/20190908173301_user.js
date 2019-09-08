exports.up = function(knex) {
  return knex.schema.createTable("user", function(t) {
    t.increments();
    //   .unsigned()
    //   .primary();
    // t.increments("id");
    t.string("name").notNull();
    t.string("password").notNull();
    t.string("username").notNull();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("user");
};
