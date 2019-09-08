import { ApolloServer } from "apollo-server";
import controllers from "./controllers";
import IContextResponse from "./interfaces/IContextResponse";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

const server = new ApolloServer({
  context: ({ req }: { req: any }): IContextResponse => ({
    controllers,
    user: controllers.user.authenticate(req.token)
  }),
  resolvers,
  typeDefs
});

server.listen().then((url: any) => {
  console.log(`Server Listen on ${url.port}`);
});
