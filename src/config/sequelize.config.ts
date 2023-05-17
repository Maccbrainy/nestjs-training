/* eslint-disable prettier/prettier */
import { SequelizeModuleOptions } from '@nestjs/sequelize';
export const sequelizeConfig: SequelizeModuleOptions = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [__dirname + '/../**/*.model.ts'],
  autoLoadModels: true,
  synchronize: true //not recommended in production
};
