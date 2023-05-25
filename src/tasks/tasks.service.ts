import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private TasksModel: typeof Tasks) {}

  async create(createTaskDto: CreateTaskDto, request: any): Promise<any> {
    createTaskDto.userId = request.user.userId;
    await this.TasksModel.create({ ...createTaskDto });
    return { message: 'Task created successfully' };
  }

  async findAll(): Promise<Tasks[]> {
    const tasks = await this.TasksModel.findAll();
    return tasks;
  }

  async findOne(taskId: ParseUUIDPipe): Promise<Tasks> {
    const task = await this.TasksModel.findOne({ where: { taskId: taskId } });
    return task;
  }

  async update(
    taskId: ParseUUIDPipe,
    updateTaskDto: UpdateTaskDto,
    request: any,
  ): Promise<any> {
    const userId: ParseUUIDPipe = request.user.userId;

    await this.TasksModel.update(updateTaskDto, {
      where: { taskId: taskId, userId: userId },
    });
    return { message: 'Task updated successfully' };
  }

  async delete(taskId: ParseUUIDPipe, request: any): Promise<any> {
    const userId: ParseUUIDPipe = request.user.userId;
    await this.TasksModel.destroy({
      where: { taskId: taskId, userId: userId },
    });
    return { message: 'Task deleted successfully' };
  }
}
