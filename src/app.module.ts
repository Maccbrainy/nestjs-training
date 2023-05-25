import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurations from './config/configurations';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configurations],
    }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        dialect: configService.get('DATABASE.dialect'),
        host: configService.get('DATABASE.host'),
        port: configService.get('DATABASE.port'),
        username: configService.get('DATABASE.username'),
        password: configService.get('DATABASE.password'),
        database: configService.get('DATABASE.database'),
        models: [__dirname + './**/*.model.ts'],
        autoLoadModels: true,
        synchronize: true, //not recommended in production
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    TasksModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
