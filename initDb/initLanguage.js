const data = require("./data");
const knex = require("knex");
const knexConfig = require("../knexfile");

const Knex = knex({
  client: "sqlite3",
  connection: {
    filename: "../db/db2.sqlite3"
  }
});

data.data.countries.map(async country => {
  try {
    country.languages.map(async l => {
      await Knex("language").insert({
        name: l.name,
        code: l.code,
        native: l.native
      });
    });
  } catch (err) {
    console.log(err);
  }
});
