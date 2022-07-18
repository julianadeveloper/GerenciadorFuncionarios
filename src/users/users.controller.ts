import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
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

  @ApiBody({ type: UserDto })
  @Get()
  async listUsers(@Query() pageFilter: any): Promise<User[]> {
    try {
      return await this.userService.listUsers(pageFilter);
    } catch (error) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
  }
  @ApiBody({ type: UserDto })
  @Get(':id')
  async listUserId(@Param('id') _id: string): Promise<User> {
    try {
      return await this.userService.listUserId(_id);
    } catch (error) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
  }
  @ApiBody({ type: UserDto })
  @Get('username')
  async listUserGet(@Param('username') username: string): Promise<getUser> {
    try {
      return await this.userService.listUserGet(username);
    } catch (Error) {
      throw new HttpException('NotFound', HttpStatus.NOT_FOUND);
    }
  }

  @Post()
  @HttpCode(204)
  // @UseGuards(RolesGuard)
  @ApiBody({ type: UserDto })
  async registerUser(@Body() user: UserDto): Promise<createUser> {
    try {
      return await this.userService.registerUser(user);
    } catch (error) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Put(':id')
  @HttpCode(200)
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
