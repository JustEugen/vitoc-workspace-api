import { TaskViewModule } from './modules/view/task-view/task-view.module';
import { AuthViewModule } from './modules/view/auth-view/auth-view.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), AuthViewModule, TaskViewModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
