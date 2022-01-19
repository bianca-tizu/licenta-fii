import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import microConfig from "./config/mikro-orm.config";

import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { UserResolver } from "./resolvers/user";
import { QuestionResolver } from "./resolvers/question";

import { __prod__ } from "./constants";

import { getPayload, getUserId } from "./util";
import { ContextType } from "./types";

const main = async () => {
  const orm = await MikroORM.init(microConfig);
  const app = require("./config/app");

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [QuestionResolver, UserResolver],
      validate: false,
    }),
    context: async ({ req, res }) => {
      // get the user token from the headers
      const token = req.headers.authorization;

      console.log("TOKEN: " + token);
      // try to retrieve a user with the token
      const { loggedIn, payload } = await getPayload(token);
      console.log("USER ID", payload);

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
