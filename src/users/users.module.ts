import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './users.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
// import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [SequelizeModule.forFeature([Users])],
  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
