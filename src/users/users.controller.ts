import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //Create a user
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  //List all users
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  //Get a user by id
  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.usersService.findOne(userId);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.delete(userId);
  }
}
