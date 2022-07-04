import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query, UseGuards, UseInterceptors
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { createUser } from './shared/dto/create-user.dto';
import { getUser } from './shared/dto/get-user.dto';
import { updateUser } from './shared/dto/update-user.dto';
import { UserDto } from './shared/dto/user.dto';
import { User } from './shared/user';
import { Userservice } from './shared/user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: Userservice) {}


  @Get()
  async listUsers(@Query() pageFilter: any): Promise<User[]> {
    return await this.userService.listUsers(pageFilter);
  }

  @Get(':id')
  async listUserId(@Param('id') _id: string): Promise<User> {
    return await this.userService.listUserId(_id);
  }

  @Get('username')
  async listUserGet(@Param('username') username: string): Promise<getUser> {
    return await this.userService.listUserGet(username);
  }


  @Post()
  @ApiBody({ type: UserDto })
  async registerNewUser(@Body() user: UserDto): Promise<createUser> {
    return await this.userService.registerNewUser(user);
  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Put(':id')
  async changeUserCredentials(
    @Param('id') id: string,
    @Body() userUpdate: updateUser,
  ) {
    return await this.userService.changeUserCredentials(id, userUpdate);
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Delete()
  async deleteUser(@Query('ids') ids: string) {
    return await this.userService.deleteUsers(ids.split(','));
  }
}
function canActivate(canActivate: any) {
  throw new Error('Function not implemented.');
}
