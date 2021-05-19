import { Options } from "@mikro-orm/core";
import { MongoDriver } from "@mikro-orm/mongodb";

import { __prod__ } from "./constants";
import { Question } from "./entities/Question";
import { User } from "./entities/User";

export default {
  entities: [Question, User],
  dbName: 'Fii-talks-db',
  type: 'mongo', 
  debug: !__prod__,
  clientUrl: 'mongodb+srv://admind:admin@Fii-talks-cluster.f2y4g.mongodb.net/Fii-talks-db?retryWrites=true&w=majority',
} as Options;