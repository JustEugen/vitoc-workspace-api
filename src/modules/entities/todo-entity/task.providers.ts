import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from './../../core/database/database.constants';
import { TaskRepository } from './task.repository';
import { Connection } from 'typeorm';
import { TASK_REPOSITORY } from './task.constants';

export const taskProviders: Provider[] = [
  {
    provide: TASK_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository<TaskRepository>(TaskRepository),
    inject: [DATABASE_CONNECTION],
  },
];
