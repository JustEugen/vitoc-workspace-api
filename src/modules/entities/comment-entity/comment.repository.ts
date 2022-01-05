import { EntityRepository, Repository } from 'typeorm';
import { Comment } from './comment.entity';

@EntityRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createOne(
    data: Pick<Comment, 'text' | 'taskId'>,
    creatorId: number,
  ): Promise<Comment> {
    const comment = new Comment();

    comment.text = data.text;
    comment.taskId = data.taskId;
    comment.creatorId = creatorId;

    return this.save(comment);
  }

  async deleteOneById(id: number): Promise<void> {
    await this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .delete()
      .execute();
  }

  async updateOneById(id: number, data: Pick<Comment, 'text'>): Promise<Comment> {
    await this.createQueryBuilder('comment')
      .update(Comment)
      .set({ text: data.text })
      .where('comment.id = :id', { id })
      .execute();

    return this.findOne(id);
  }

  async getAllByTaskId(taskId: number): Promise<Comment[]> {
    return await this.createQueryBuilder('comment')
      .where('comment.taskId = :taskId', { taskId })
      .getMany();
  }

  async getOneById(id: number): Promise<Comment> {
    return await this.createQueryBuilder('comment')
      .where('comment.id = :id', { id })
      .getOne();
  }
}
