import { Inject, Injectable } from '@nestjs/common';
import { COMMENT_REPOSITORY } from '../../entities/comment-entity/comment.constants';
import { CommentRepository } from '../../entities/comment-entity/comment.repository';
import { Comment } from '../../entities/comment-entity/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @Inject(COMMENT_REPOSITORY)
    private readonly commentRepository: CommentRepository,
  ) {}

  async createOne(
    data: Pick<Comment, 'text' | 'taskId'>,
    creatorId: number,
  ): Promise<Comment> {
    return this.commentRepository.createOne(data, creatorId);
  }

  async updateOne(id: number, data: Pick<Comment, 'text'>): Promise<Comment> {
    return await this.commentRepository.updateOneById(id, data);
  }

  async deleteOne(id: number): Promise<void> {
    await this.commentRepository.deleteOneById(id);
  }

  async getAllByTaskId(taskId: number): Promise<Comment[]> {
    return await this.commentRepository.getAllByTaskId(taskId);
  }

  async getOneById(id: number): Promise<Comment> {
    return await this.commentRepository.getOneById(id);
  }
}
