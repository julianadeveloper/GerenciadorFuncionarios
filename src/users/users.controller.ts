import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
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
  async listUsers(User): Promise<User[]> {
    return await this.userService.listUsers();
  }

  @UseGuards(RolesGuard)
  @Get(':username')
  async listUserId(@Param('username') username: string): Promise<getUser> {
    return await this.userService.listUserId(username);
  }

  @Post()
  @ApiBody({ type: UserDto })
  async registerNewUser(@Body() user: UserDto): Promise<createUser> {
    return await this.userService.registerNewUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async changeUserCredentials(
    @Param('id') id: string,
    @Body() userUpdate: updateUser,
  ) {
    return await this.userService.changeUserCredentials(id, userUpdate);
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Delete()
  async deleteUser(@Query('ids') ids: string) {
    return await this.userService.deleteUsers(ids.split(','));
  }
}
