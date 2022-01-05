import { DatabaseModule } from './../../core/database/database.module';
import { Module } from '@nestjs/common';
import { commentProviders } from './comment.providers';

@Module({
  imports: [DatabaseModule],
  providers: [...commentProviders],
  exports: [...commentProviders],
})
export class CommentEntityModule {}
