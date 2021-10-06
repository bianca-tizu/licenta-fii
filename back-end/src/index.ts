import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import microConfig from "./mikro-orm.config";

import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";

import { AuthResolver } from "./resolvers/auth";
import { UserResolver } from "./resolvers/user";
import { QuestionResolver } from "./resolvers/question";

import { __prod__ } from "./constants";

import session from "express-session";
import MongoStore from "connect-mongo";
import cors from "cors";
import { getPayload, getUserId } from "./util";

import { gravatar } from "./gravatar";

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  const app = express();
  app.use(
    cors({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  app.use(
    session({
      name: "cookieId",
      resave: false,
      saveUninitialized: false,
      secret: "aaabbbccc",
      store: MongoStore.create({
        mongoUrl:
          "mongodb+srv://admind:admin@Fii-talks-cluster.f2y4g.mongodb.net/Fii-talks-db?retryWrites=true&w=majority",
        ttl: 30 * 24 * 60 * 60, // = 30 days
        touchAfter: 24 * 3600, // time period in seconds
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__, //cookie only works in https
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, QuestionResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }) => {
      // get the user token from the headers
      const token = req.headers.authorization || "";
      // try to retrieve a user with the token
      const { loggedIn, payload } = getPayload(token);

      return { em: orm.em, loggedIn: loggedIn, payload: payload };
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
