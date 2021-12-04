import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async createOne({ title, description, creatorId }): Promise<Task> {
    const task = new Task();

    task.title = title;
    task.description = description;
    task.creatorId = creatorId;

    console.log('creatorId: ', creatorId);

    return this.save(task);
  }

  async deleteOneById(id: number): Promise<void> {
    await this.createQueryBuilder('task')
      .where('task.id = :id', { id })
      .delete()
      .execute();
  }

  async updateOneById(id: number, task: Partial<Task>): Promise<void> {
    await this.createQueryBuilder('task')
      .update(Task)
      .set({ ...task })
      .where('task.id = :id', { id })
      .execute();
  }

  async getAllByUserId(userId: number): Promise<Task[]> {
    return await this.createQueryBuilder('task')
      .where('task.creatorId = :creatorId', { creatorId: userId })
      .getMany();
  }

  async getOneById(id: number): Promise<Task> {
    return await this.createQueryBuilder('task')
      .where('task.id = :id', { id })
      .getOne();
  }
}
