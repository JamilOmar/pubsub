import {createConnection} from 'typeorm';
export async function getDbConnection(dbConfig) {
  const conn = await createConnection(dbConfig);
  return conn;
}
