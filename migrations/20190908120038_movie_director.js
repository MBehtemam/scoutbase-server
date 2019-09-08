exports.up = function(knex) {
  return knex.schema.createTable("movie_director", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.integer("movieId")
      .unsigned()
      .index()
      .references("id")
      .inTable("movie");

    t.integer("directorId")
      .unsigned()
      .index()
      .references("id")
      .inTable("director");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("movie_director");
};
