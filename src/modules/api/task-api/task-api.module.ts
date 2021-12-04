import { AuthApiModule } from './../auth-api/auth-api.module';
import { UserEntityModule } from './../../entities/user-entity/user-entity.module';
import { AuthGuard } from './../auth-api/auth.guard';
import { TaskService } from './task.service';
import { TaskEntityModule } from './../../entities/todo-entity/task-entity.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [TaskEntityModule, UserEntityModule, AuthApiModule],
  providers: [TaskService, AuthGuard],
  exports: [TaskService, AuthGuard],
})
export class TaskApiModule {}
