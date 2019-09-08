import { ApolloServer, gql } from "apollo-server";
import SERVER_CONFIG from "./config/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";
import knex from "knex";
import knexConfig from "./config/knexConfig";
import JWT from "jsonwebtoken";
import IContextResponse from "./interfaces/IContextResponse";
import controllers from "./controllers";
const Knex = knex(knexConfig);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }: { req: any }): IContextResponse => ({
    controllers,
    user: controllers.user.authenticate(req.token)
  })
});

server.listen().then(url => {
  console.log(`Server Listen on ${url.port}`);
});
