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
    const continent = await Knex("continent")
      .select("*")
      .where({ code: country.continent.code, name: country.continent.name })
      .first();
    await Knex("country").insert({
      code: country.code,
      name: country.name,
      native: country.native,
      phone: country.phone,
      continent: continent.id,
      currency: country.currency,
      emoji: country.emoji,
      emojiU: country.emojiU
    });
  } catch (err) {
    console.log(err);
  }
});
