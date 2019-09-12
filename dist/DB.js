"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const knexConfig_1 = __importDefault(require("./config/knexConfig"));
const Knex = knex_1.default(knexConfig_1.default);
class DB {
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
exports.default = DB;
