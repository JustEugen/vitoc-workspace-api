import { UserEntityModule } from './../../entities/user-entity/user-entity.module';
import { TaskController } from './task.controller';
import { AuthApiModule } from './../../api/auth-api/auth-api.module';
import { TaskApiModule } from './../../api/task-api/task-api.module';
import { Module } from '@nestjs/common';
import { CommentApiModule } from '../../api/comment-api/comment-api.module';

@Module({
  imports: [AuthApiModule, UserEntityModule, TaskApiModule, CommentApiModule],
  controllers: [TaskController],
  exports: [],
})
export class TaskViewModule {}
