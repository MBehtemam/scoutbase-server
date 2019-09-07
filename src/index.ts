import { ApolloServer, gql } from "apollo-server";
import SERVER_CONFIG from "./config/server";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(url => {
  console.log(`Server Listen on ${url.port}`);
});
