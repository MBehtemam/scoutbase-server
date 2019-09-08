exports.up = function(knex, Promise) {
  return knex.schema.alterTable("user", function(t) {
    t.string("username");
    t.unique("username");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.alterTable("user", function(t) {
    t.string("username");
    t.unique("username");
  });
};
