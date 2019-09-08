import { ApolloServer, gql } from "apollo-server";
import SERVER_CONFIG from "./config/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import knex from "knex";
import knexConfig from "./config/knexConfig";

const Knex = knex(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    db: {
      continentDB: Knex("continent"),
      languageDB: Knex("language"),
      countryDB: Knex("country"),
      countrylanguageDB: Knex("countrylanguage"),
      countrycontinentDB: Knex("countrycontinent"),
      actorDB: Knex("actor"),
      directorDB: Knex("director"),
      movieDB: Knex("movie"),
      movieActorDB: Knex("movie_actor")
    }
  })
});

server.listen().then(url => {
  console.log(`Server Listen on ${url.port}`);
});
