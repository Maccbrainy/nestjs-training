import { Injectable, ParseUUIDPipe } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Tasks) private TasksModel: typeof Tasks) {}

  async create(createTaskDto: CreateTaskDto, req: Request): Promise<string> {
    createTaskDto.userId = req['user'].userId;
    await this.TasksModel.create({ ...createTaskDto });
    return 'Task created successfully';
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
    req: Request,
  ): Promise<string> {
    const userId: ParseUUIDPipe = req['user'].userId;

    await this.TasksModel.update(updateTaskDto, {
      where: { taskId: taskId, userId: userId },
    });
    return 'Task updated successfully';
  }

  async delete(taskId: ParseUUIDPipe, req: Request): Promise<string> {
    const userId: ParseUUIDPipe = req['user'].userId;
    await this.TasksModel.destroy({
      where: { taskId: taskId, userId: userId },
    });
    return 'Task deleted successfully';
  }
}
