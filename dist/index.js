"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const resolvers_1 = __importDefault(require("./resolvers"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const knex_1 = __importDefault(require("knex"));
const knexConfig_1 = __importDefault(require("./config/knexConfig"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Knex = knex_1.default(knexConfig_1.default);
const server = new apollo_server_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ req }) => {
        let user = undefined;
        const authToken = req.headers.authorization || "";
        if (authToken) {
            const token = authToken.split(" ")[1];
            const userInfo = jsonwebtoken_1.default.verify(token, "something");
            if (userInfo) {
                user = Knex("user")
                    .select()
                    .where("id", userInfo.id);
            }
        }
        return {
            user,
            db: {
                continentDB: Knex("continent"),
                languageDB: Knex("language"),
                countryDB: Knex("country"),
                countrylanguageDB: Knex("countrylanguage"),
                countrycontinentDB: Knex("countrycontinent"),
                actorDB: Knex("actor"),
                directorDB: Knex("director"),
                movieDB: Knex("movie"),
                movieActorDB: Knex("movie_actor"),
                movieDirectorDB: Knex("movie_director"),
                userDB: Knex("user"),
                Knex: Knex
            }
        };
    }
});
server.listen().then(url => {
    console.log(`Server Listen on ${url.port}`);
});
