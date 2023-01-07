import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers/index.js";
import errorController from "./errorController.js";
import { getUser } from "./utils/getUser.js";
import json from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  await server.start();

  await mongoose.connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@fii-talks-cluster.f2y4g.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`
  );
  console.log("Mongoose connected");

  app.listen({ port: 8000 }, () => {
    console.log("Your Apollo Server is running on port 8000");
  });

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: ({ req }) => {
        const token = req.get("Authorization") || "";
        const user = getUser(token);

        return { user };
      },
    })
  );

  app.use(errorController);
};

startServer();
