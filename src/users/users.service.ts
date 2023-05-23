import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users)
    private UsersModel: typeof Users,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    const { email } = createUserDto;
    const user = await this.UsersModel.findOne({ where: { email: email } });

    if (user) return 'User already exist';
    await this.UsersModel.create({ ...createUserDto });
    return 'Account created successfully';
  }
  async findAll(): Promise<Users[]> {
    const users = await this.UsersModel.findAll();
    return users;
  }

  async findOne(userId: string): Promise<Users> {
    const user = await this.UsersModel.findByPk(userId);
    return user;
  }

  async delete(userId: string): Promise<string> {
    await this.UsersModel.destroy({ where: { userId: userId } });
    return 'Account deleted successfully';
  }
}
