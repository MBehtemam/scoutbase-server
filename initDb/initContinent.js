const continents = require("./continents");
const knex = require("knex");
const knexConfig = require("../knexfile");

const Knex = knex({
  client: "sqlite3",
  connection: {
    filename: "../db/db2.sqlite3"
  }
});

continents.data.continents.map(async continet => {
  try {
    await Knex("continent").insert({
      name: continet.name,
      code: continet.code
    });
  } catch (err) {
    console.log(err);
  }
});
