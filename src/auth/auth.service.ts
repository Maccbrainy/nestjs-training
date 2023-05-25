import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';
import { Users } from 'src/users/users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users) private UserModel: typeof Users,
    private jwtService: JwtService,
  ) {}

  async verifyAndTokenizeLoginUser(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<any> {
    const { email, password } = loginCredentialsDto;
    if (email && password) {
      const user = await this.UserModel.findOne({ where: { email: email } });
      if (!user) return { message: 'User does not exist' };
      if (bcrypt.compareSync(password, user.password)) {
        const payload = {
          id: user.userId,
        };
        const token = await this.jwtService.signAsync(payload);
        return { token };
      }
      return { message: 'Invalid Email or Password' };
    }
    return { message: 'Invalid Credential' };
  }
}
