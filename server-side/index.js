import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { PubSub } from "graphql-subscriptions";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";
import { createServer } from "http";
import { makeExecutableSchema } from "@graphql-tools/schema";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import json from "body-parser";
import dotenv from "dotenv";

import typeDefs from "./typeDefs.js";
import resolvers from "./resolvers/index.js";
import errorController from "./errorController.js";
import { getUser } from "./utils/getUser.js";
import { seedSystemChallenges } from "./utils/seedChallenges.js";
import removeSeenNotifications from "./utils/removeSeenNotifications.js";

dotenv.config();
export const pubsub = new PubSub();

const startServer = async () => {
  const app = express();
  const httpServer = createServer(app);
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const serverCleanup = useServer({ schema }, wsServer);

  const server = new ApolloServer({
    schema,

    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });
  await server.start();
  await mongoose.connect(
    `mongodb+srv://${process.env.mongoUserName}:${process.env.mongoUserPassword}@fii-talks-cluster.f2y4g.mongodb.net/${process.env.mongoDatabase}?retryWrites=true&w=majority`
  );
  await seedSystemChallenges();

  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.get("Authorization") || "";
        const user = getUser(token);

        return { user };
      },
    })
  );

  console.log("Mongoose connected");

  httpServer.listen({ port: 8000 }, () => {
    console.log("Your Apollo Server is running on port 8000");
  });

  app.use(errorController);
};

startServer();
