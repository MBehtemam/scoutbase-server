exports.up = function(knex) {
  return knex.schema.createTable("movie", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("title").notNull();
    t.integer("year").notNull();
    t.integer("reating");
    t.string("scoutbase_rating");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movie");
};
