import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('api/v1/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Request() req: any) {
    return this.tasksService.create(createTaskDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':taskId')
  findOne(@Param('taskId') taskId: ParseUUIDPipe) {
    return this.tasksService.findOne(taskId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':taskId')
  update(
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('taskId') taskId: ParseUUIDPipe,
    @Request() req: any,
  ) {
    return this.tasksService.update(taskId, updateTaskDto, req);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':taskId')
  remove(@Param('taskId') taskId: ParseUUIDPipe, @Request() req: any) {
    return this.tasksService.delete(taskId, req);
  }
}
