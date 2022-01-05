import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../../api/auth-api/auth.guard';
import { ReqUser } from '../../api/auth-api/auth-req-user.decorator';
import { User } from '../../entities/user-entity';
import { CreateCommentDto } from '../task-view/dtos/create-comment.dto';
import { CommentService } from '../../api/comment-api/comment.service';
import { Comment } from '../../entities/comment-entity/comment.entity';
import { UpdateCommentDto } from '../task-view/dtos/update-comment.dto';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}



}
