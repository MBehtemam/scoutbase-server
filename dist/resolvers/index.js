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
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        continents: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.controllers.continent.getAll();
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        languages: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.controllers.language.getAll();
            }
            catch (err) {
                throw new Error(err);
            }
        }),
        countries: (parent, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                return yield ctx.controllers.country.getAll();
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
        createUser: (parent, { username, password }, ctx, info) => __awaiter(void 0, void 0, void 0, function* () { return yield ctx.controllers.user.createUser(username, password); }),
        login: (parent, { username, password }, ctx, info) => __awaiter(void 0, void 0, void 0, function* () { return yield ctx.controllers.user.loginUser(username, password); })
    }
};
exports.default = resolvers;
