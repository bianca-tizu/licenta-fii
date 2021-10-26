import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import microConfig from "./config/mikro-orm.config";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { AuthResolver } from "./resolvers/auth";
import { UserResolver } from "./resolvers/user";
import { QuestionResolver } from "./resolvers/question";

import { __prod__ } from "./constants";

import { getPayload, getUserId } from "./util";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  const app = require("./config/app");

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, QuestionResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => {
      // get the user token from the headers
      const token = req.headers.authorization;
      // try to retrieve a user with the token
      const { loggedIn, payload } = getPayload(token);

      return { em: orm.em, userId: payload, loggedIn: loggedIn };
    },
  });

  apolloServer.applyMiddleware({ app, cors: false });

  app.listen(4000, () => {
    console.log("server started on localhost:4000");
  });
};

main().catch((err) => {
  console.log(err);
});
