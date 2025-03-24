import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.updateUser(id, dto);
  }
}
