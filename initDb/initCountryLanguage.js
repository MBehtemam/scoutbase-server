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
    country.languages.map(async l => {
      const lId = await Knex("language")
        .select("*")
        .where({ code: l.code, native: l.native, name: l.name })
        .first();
      await Knex("countrylanguage").insert({
        countryId: cId.id,
        languageId: lId.id
      });
    });
  } catch (err) {
    console.log(err);
  }
});
