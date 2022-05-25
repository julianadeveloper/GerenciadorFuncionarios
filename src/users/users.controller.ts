import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { deleteModel } from 'mongoose';
import { User } from './shared/user';
import { Userservice } from './shared/user.service';

@Controller('users')

export class UsersController {
  constructor(private readonly userService: Userservice) {}

  @Get()
 async listUsers(User): Promise<User[]> {
    return await this.userService.listUsers();
  }

  @Get(':id')
  async listUserId(@Param('id') id: string): Promise<User> {
    
    return await this.userService.listUserId(id) ;
  }

  @Post()
  async registerNewUser(@Body() user: User): Promise<User> {
    return await this.userService.registerNewUser(user);
  }

  @Put(':id')
 async  changeUserCredentials(@Param('id') id: string, @Body() userUpdated: User) {
    return await this.userService.changeUserCredentials(id, userUpdated);
  }

  @Delete()
 async deleteUser(@Query('ids') ids: string) {

    return await this.userService.deleteUsers(ids.split(','));
  }


}
