import { Module } from '@nestjs/common';
import { userProviders } from './user.providers';
import { DatabaseModule } from '../../core/database';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders],
  exports: [...userProviders],
})
export class UserEntityModule {}
