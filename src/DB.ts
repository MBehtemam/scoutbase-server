import knex from "knex";
import knexConfig from "./config/knexConfig";
import IDB from "./interfaces/IDB";
const Knex = knex(knexConfig);
class DB {
  continent: object;
  language: object;
  country: object;
  countrylanguage: object;
  countrycontinent: object;
  actor: object;
  director: object;
  movie: object;
  movieActor: object;
  movieDirector: object;
  user: object;
  Knex: object;
  constructor() {
    this.continent = Knex("continent");
    this.language = Knex("language");
    this.country = Knex("country");
    this.countrylanguage = Knex("countrylanguage");
    this.countrycontinent = Knex("countrycontinent");
    this.actor = Knex("actor");
    this.director = Knex("director");
    this.movie = Knex("movie");
    this.movieActor = Knex("movie_actor");
    this.movieDirector = Knex("movie_director");
    this.user = Knex("user");
    this.Knex = Knex;
  }
}
// const DB = (): IDB => ({
//   continent: Knex("continent"),
//   language: Knex("language"),
//   country: Knex("country"),
//   countrylanguage: Knex("countrylanguage"),
//   countrycontinent: Knex("countrycontinent"),
//   actor: Knex("actor"),
//   director: Knex("director"),
//   movie: Knex("movie"),
//   movieActor: Knex("movie_actor"),
//   movieDirector: Knex("movie_director"),
//   user: Knex("user"),
//   Knex: Knex
// });
export default DB;
