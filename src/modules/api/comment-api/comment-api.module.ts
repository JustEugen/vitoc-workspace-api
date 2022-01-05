import { Module } from '@nestjs/common';
import { CommentEntityModule } from '../../entities/comment-entity/comment-entity.module';
import { AuthApiModule } from '../auth-api/auth-api.module';
import { UserEntityModule } from '../../entities/user-entity/user-entity.module';
import { CommentService } from './comment.service';

@Module({
  imports: [CommentEntityModule, AuthApiModule, UserEntityModule],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentApiModule {}
