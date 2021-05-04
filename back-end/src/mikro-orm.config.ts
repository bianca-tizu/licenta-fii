import path from "path";

import { MikroORM } from "@mikro-orm/core";

import { __prod__ } from "./constants";
import { Question } from "./entities/Question";

export default {
  entities: [Question],
  dbName: 'Fii-talks-db',
  type: 'mongo', 
  debug: !__prod__,
  clientUrl: 'mongodb+srv://admind:admin@Fii-talks-cluster.f2y4g.mongodb.net/Fii-talks-db?retryWrites=true&w=majority',
} as Parameters<typeof MikroORM.init>[0];