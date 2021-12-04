import { Provider } from '@nestjs/common';
import { USER_REPOSITORY } from './user.constants';
import { DATABASE_CONNECTION } from '../../core/database';
import { Connection } from 'typeorm';
import { UserRepository } from './user.repository';

export const userProviders: Provider[] = [
  {
    provide: USER_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository<UserRepository>(UserRepository),
    inject: [DATABASE_CONNECTION],
  },
];
