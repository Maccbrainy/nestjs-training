import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from '@nestjs/sequelize';
import { ExtractJwt, Strategy } from 'passport-jwt';
// import { jwtConfig } from 'src/config/jwt.config';
import { Users } from 'src/users/users.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(Users) private UsersModel: typeof Users) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'qwertyuiop1234567890',
    });
  }
  async validate(payload: any) {
    const user = await this.UsersModel.findByPk(payload.id);
    if (user)
      return {
        userId: user.userId,
        email: user.email,
      };
  }
}
