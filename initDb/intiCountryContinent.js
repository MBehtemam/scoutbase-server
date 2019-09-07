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
    const cId = await Knex("country")
      .select("*")
      .where({ name: country.name, code: country.code })
      .first();
    const continentId = await Knex("continent")
      .select("*")
      .where({ code: country.continent.code })
      .first();
    await Knex("countrycontinent").insert({
      countryId: cId.id,
      continentId: continentId.id
    });
  } catch (err) {
    console.log(err);
  }
});
