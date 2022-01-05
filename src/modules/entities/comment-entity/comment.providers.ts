import { Provider } from '@nestjs/common';
import { DATABASE_CONNECTION } from './../../core/database/database.constants';
import { Connection } from 'typeorm';
import { COMMENT_REPOSITORY } from './comment.constants';
import { CommentRepository } from './comment.repository';

export const commentProviders: Provider[] = [
  {
    provide: COMMENT_REPOSITORY,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository<CommentRepository>(CommentRepository),
    inject: [DATABASE_CONNECTION],
  },
];
