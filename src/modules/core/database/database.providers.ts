import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from './database.constants';
import { createConnection } from 'typeorm';

export const databaseProviders: Provider[] = [
  {
    provide: DATABASE_CONNECTION,
    useFactory: async () => {
      console.log('proccess env TEST: ', process.env);

      return await createConnection({
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: process.env.DATABASE_SERVER,
        entities: ['dist/**/*.entity{.ts,.js}'],
        type: 'mysql',
        synchronize: true,
      });
    },
  },
];
