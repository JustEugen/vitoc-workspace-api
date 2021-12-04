import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { taskProviders } from './task.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...taskProviders],
  exports: [...taskProviders],
})
export class TaskEntityModule {}
