import {MikroORM} from '@mikro-orm/core';
import { __prod__ } from './constants';

const main = async () => {
  const orm = await MikroORM.init({
    // entities: [User, Question],
    dbName: 'fii-talks-db',
    debug: !__prod__,
    clientUrl: 'mongodb://localhost:27017',
    type: 'mongo',
  });
  console.log(orm.em);
}

main()
