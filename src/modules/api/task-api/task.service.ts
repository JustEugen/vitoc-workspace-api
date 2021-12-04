import { Task } from './../../entities/todo-entity/task.entity';
import { TaskRepository } from './../../entities/todo-entity/task.repository';
import { TASK_REPOSITORY } from './../../entities/todo-entity/task.constants';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskRepository: TaskRepository,
  ) {}

  async createOne({
    title,
    description,
    creatorId,
  }: {
    title: string;
    description: string;
    creatorId: number;
  }): Promise<Task> {
    return this.taskRepository.createOne({ title, description, creatorId });
  }

  async updateOne(
    id: number,
    task: Pick<Task, 'title' | 'description'>,
  ): Promise<void> {
    await this.taskRepository.updateOneById(id, task);
  }

  async deleteOne(id: number): Promise<void> {
    await this.taskRepository.deleteOneById(id);
  }

  async getAllByUserId(userId: number): Promise<Task[]> {
    return await this.taskRepository.getAllByUserId(userId);
  }

  async getOneById(id: number): Promise<Task> {
    return await this.taskRepository.getOneById(id);
  }
}
