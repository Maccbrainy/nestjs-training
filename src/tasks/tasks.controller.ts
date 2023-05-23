import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/v1/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    return this.tasksService.create(createTaskDto, req);
  }

  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':taskId')
  findOne(@Param('taskId') taskId: ParseUUIDPipe) {
    return this.tasksService.findOne(taskId);
  }

  @Patch(':taskId')
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: ParseUUIDPipe,
    @Req() req: Request,
  ) {
    return this.tasksService.update(taskId, updateTaskDto, req);
  }

  @Delete(':taskId')
  remove(@Param('taskId') taskId: ParseUUIDPipe, @Req() req: Request) {
    return this.tasksService.delete(taskId, req);
  }
}
