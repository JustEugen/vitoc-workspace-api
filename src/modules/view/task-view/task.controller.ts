import { UpdateTaskDto } from './dtos/update-task.dto';
import { AuthGuard } from './../../api/auth-api/auth.guard';
import { User } from './../../entities/user-entity/user.entity';
import { ReqUser } from './../../api/auth-api/auth-req-user.decorator';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskService } from './../../api/task-api/task.service';
import { Task } from './../../entities/todo-entity/task.entity';
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

@Controller('tasks')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('')
  async createOne(
    @ReqUser() user: User,
    @Body() { title, description }: CreateTaskDto,
  ): Promise<Task> {
    return this.taskService.createOne({
      title,
      description,
      creatorId: user.id,
    });
  }

  @Get('')
  async getAll(@ReqUser() user: User): Promise<Task[]> {
    return this.taskService.getAllByUserId(user.id);
  }

  @Delete(':taskId')
  async deleteOne(
    @ReqUser() user: User,
    @Param('taskId') taskId: number,
  ): Promise<void> {
    taskId = +taskId;

    const existedTask = await this.taskService.getOneById(taskId);

    if (!existedTask) {
      throw new BadRequestException({
        code: 'TASK_WITH_SUCH_ID_DOES_NOT_EXIST',
      });
    }

    if (existedTask.creatorId !== user.id) {
      throw new ForbiddenException({
        code: 'NO_PERMISSION',
      });
    }

    await this.taskService.deleteOne(taskId);
  }

  @Put(':taskId')
  async updateOne(
    @ReqUser() user: User,
    @Param('taskId') taskId: number,
    @Body() dto: UpdateTaskDto,
  ): Promise<void> {
    taskId = +taskId;

    const existedTask = await this.taskService.getOneById(taskId);

    if (!existedTask) {
      throw new BadRequestException({
        code: 'TASK_WITH_SUCH_ID_DOES_NOT_EXIST',
      });
    }

    if (existedTask.creatorId !== user.id) {
      throw new ForbiddenException({
        code: 'NO_PERMISSION',
      });
    }

    await this.taskService.updateOne(taskId, dto);
  }
}
