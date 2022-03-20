import { ApolloServer } from "apollo-server-express";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers/index.js";
import errorController from "./errorController.js";

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });
  await server.start();
  server.applyMiddleware({ app });

  await mongoose.connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@fii-talks-cluster.f2y4g.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`
  );
  console.log("Mongoose connected");

  app.listen({ port: 8000 }, () => {
    console.log("Your Apollo Server is running on port 8000");
  });

  app.use(cors());

  app.use((req, res) => {
    res.send("Hello from express");
  });

  app.use(errorController);
};

startServer();
