import { ApolloServer, gql } from "apollo-server";
import SERVER_CONFIG from "./config/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import knex from "knex";
import knexConfig from "./config/knexConfig";
import JWT from "jsonwebtoken";

const Knex = knex(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: any }) => {
    let user = undefined;
    const authToken = req.headers.authorization || "";
    if (authToken) {
      const token = authToken.split(" ")[1];
      const userInfo: any = JWT.verify(token, "something");
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
