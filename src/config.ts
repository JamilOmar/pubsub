import {User} from './models';

const LISTENER_CWD = process.env.LISTENER_CWD || process.cwd();
const REDIS_URL = process.env.REDIS_URL || '';
const LISTENER_SOURCE = process.env.LISTENER_SOURCE || './input/logs';
const LISTENER_DESTINATION = process.env.LISTENER_DESTINATION || './output/logs';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_USER = process.env.DATABASE_USER || '';
const DATABASE_PORT = 27017;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || '';
const DATABASE_DB = 'pub-sub-demo';
const entities = [User];
export const CONFIG = {
  listener: {
    source: LISTENER_SOURCE,
    destination: LISTENER_DESTINATION,
    cwd: LISTENER_CWD,
    watcher: {persistent: true}
  },
  db: {
    type: 'mongodb',
    host: DATABASE_HOST,
    port: DATABASE_PORT,
    username: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_DB,
    entities: entities,
    synchronize: true,
    logging: false
  },
  redis: {
    url: REDIS_URL
  }
};
