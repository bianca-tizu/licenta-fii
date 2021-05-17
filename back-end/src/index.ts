import "reflect-metadata";

import { MikroORM } from "@mikro-orm/core";
import config from './mikro-orm.config';

import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import {buildSchema} from 'type-graphql';

import { AuthResolver } from './resolvers/auth';
import { UserResolver } from './resolvers/user';
import { QuestionResolver } from './resolvers/question';

import { __prod__ } from './constants';

import { ContextType } from "./types";


const main = async () => {
  const orm = await MikroORM.init(config);

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthResolver, QuestionResolver, UserResolver],
      validate: false
    }),
    context: (): ContextType => ({ em: orm.em})
  });

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  })
}

main().catch(err => {
  console.log(err);
});