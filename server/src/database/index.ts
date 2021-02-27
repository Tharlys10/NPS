import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
  // captured infor to ormconfig
  const defaultOptions = await getConnectionOptions();

  // create connection database
  return createConnection(
    Object.assign(defaultOptions, {
      database: process.env.NODE_ENV === 'test'
        ? './src/database/database.test.sqlite'
        : defaultOptions.database,

      logging: process.env.NODE_ENV === 'dev'
        ? true
        : false
    })
  );
}
