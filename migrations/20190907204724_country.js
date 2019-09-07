exports.up = function(knex) {
  return knex.schema.createTable("country", function(t) {
    t.increments("id")
      .unsigned()
      .primary();
    t.string("code").notNull();
    t.string("name").notNull();
    t.string("native").notNull();
    t.string("phone").notNull();
    t.string("continent").notNull();
    t.string("currency").notNull();
    t.string("emoji").notNull();
    t.string("emojiU").notNull();
    t.unique("code");
    t.unique("phone");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("country");
};
