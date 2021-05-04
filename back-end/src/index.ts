import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";

import config from './mikro-orm.config';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';

import { HelloResolver } from './resolvers/hello';
import { __prod__ } from './constants';
import { Question } from './entities/Question';

const main = async () => {
  const orm = await MikroORM.init(config);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver],
      validate: false
    })
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  })
}

main().catch(err => {
  console.log(err);
});