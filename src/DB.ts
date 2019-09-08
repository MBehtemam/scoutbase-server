import knex from "knex";
import knexConfig from "./config/knexConfig";
import IDB from "./interfaces/IDB";
const Knex = knex(knexConfig);

const DB: IDB = {
  continent: Knex("continent"),
  language: Knex("language"),
  country: Knex("country"),
  countrylanguage: Knex("countrylanguage"),
  countrycontinent: Knex("countrycontinent"),
  actor: Knex("actor"),
  director: Knex("director"),
  movie: Knex("movie"),
  movieActor: Knex("movie_actor"),
  movieDirector: Knex("movie_director"),
  user: Knex("user"),
  Knex: Knex
};
export default DB;
