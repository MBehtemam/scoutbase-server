"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const resolvers = {
    Query: {
        continents: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.db.continentDB.select("*");
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        languages: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.db.languageDB.select("*");
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        countries: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                let allCountries = yield ctx.db.countryDB.select("*");
                const allLanguages = yield ctx.db.languageDB.select("*");
                const countrylanguage = yield ctx.db.countrylanguageDB.select("*");
                const countrycontinent = yield ctx.db.countrycontinentDB.select("*");
                const allContinents = yield ctx.db.continentDB.select("*");
                allCountries = allCountries.map((country) => {
                    const languageIds = countrylanguage
                        .filter((cl) => cl.countryId === country.id.toString())
                        .map((l) => parseInt(l.languageId));
                    const continentId = countrycontinent.find((cc) => cc.countryId == country.id).continentId;
                    return Object.assign(Object.assign({}, country), { languages: allLanguages.filter((l) => languageIds.includes(l.id)), continent: allContinents.find((c) => c.id === continentId) });
                });
                return allCountries;
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        movies: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            const allMovies = yield ctx.db.movieDB.select();
            const allActors = yield ctx.db.actorDB.select();
            const allDirectors = yield ctx.db.directorDB.select();
            const allMovieActor = yield ctx.db.movieActorDB.select();
            const allMovieDirector = yield ctx.db.movieDirectorDB.select();
            return allMovies.map((movie) => {
                const actorsIds = allMovieActor
                    .filter((m) => m.movieId === movie.id)
                    .map((a) => a.actorId);
                const directorsId = allMovieDirector
                    .filter((m) => m.movieId === movie.id)
                    .map((d) => d.directorId);
                return Object.assign(Object.assign({}, movie), { directors: allDirectors.filter((d) => directorsId.includes(d.id)), actors: allActors.filter((a) => actorsIds.includes(a.id)), scoutbase_rating: ctx.user
                        ? (Math.random() * (9 - 5 + 1) + 5).toFixed(2).toString()
                        : null });
            });
        })
    },
    Mutation: {
        createUser: (parent, { username, password }, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const userExists = yield ctx.db.userDB
                    .select()
                    .where("username", username)
                    .first();
                if (userExists) {
                    throw new Error("user already exists");
                }
                else {
                    const user = yield ctx.db.userDB.insert({
                        username,
                        password,
                        name: ""
                    });
                    const newUser = yield ctx.db
                        .Knex("user")
                        .select()
                        .where("id", user[0].toString())
                        .first();
                    return {
                        user: newUser,
                        token: jsonwebtoken_1.default.sign({ id: newUser.id, name: newUser.name }, "something")
                    };
                }
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        login: (parent, { username, password }, ctx, info) => __awaiter(void 0, void 0, void 0, function* () { return yield ctx.controllers.user.loginUser(username, password); })
    }
};
exports.default = resolvers;
