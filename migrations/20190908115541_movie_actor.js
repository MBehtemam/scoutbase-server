exports.up = function(knex) {
  return knex.schema.createTable("movie_actor", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("movieId")
      .unsigned()
      .index()
      .references("id")
      .inTable("movie");

    t.integer("actorId")
      .unsigned()
      .index()
      .references("id")
      .inTable("actor");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movie_actor");
};
