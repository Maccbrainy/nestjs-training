import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeConfig } from './config/sequelize.config';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot(sequelizeConfig),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
