import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([Tasks]), UsersModule],
  exports: [SequelizeModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
