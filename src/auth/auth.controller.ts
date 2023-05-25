import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginCredentialsDto } from './dto/loginCredentials.dto';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  verifyAndTokenizeLoginUser(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.verifyAndTokenizeLoginUser(loginCredentialsDto);
  }
}
