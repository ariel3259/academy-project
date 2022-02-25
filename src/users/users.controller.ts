import { Body, Controller, Post } from '@nestjs/common';
import { UsersDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post('register')
  async Register(@Body() user: UsersDto): Promise<object> {
    return await this.userService.Register(user);
  }

  @Post('auth')
  async Auth(@Body() user: UsersDto): Promise<object> {
    return await this.userService.Auth(user);
  }
}
