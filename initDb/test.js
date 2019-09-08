const data = require("./data");
const knex = require("knex");
const knexConfig = require("../knexfile");

const Knex = knex({
  client: "sqlite3",
  connection: {
    filename: "../db/db2.sqlite3"
  }
});

const init = async () => {
  /**
 select * from language 
join countrylanguage on countrylanguage.languageId  = language.id
where languageId = 1
   */
  try {
    const countries = await Knex("user")
      .select("*")
      .where("id", "1")
      .first();

    console.log(countries);
    return countries;
  } catch (err) {
    return err;
  }
};

init();
