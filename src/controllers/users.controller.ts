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
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles/roles.guard';
import { createUser } from '../users/shared/dto/create-user.dto';
import { getUser } from '../users/shared/dto/get-user.dto';
import { updateUser } from '../users/shared/dto/update-user.dto';
import { UserDto } from '../users/shared/dto/user.dto';
import { User } from '../users/shared/enitity/user';
import { Userservice } from '../services/user.service';
import { putUser } from 'src/users/shared/dto/user-update.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: Userservice) {}

  @ApiBody({ type: UserDto })
  @ApiProperty({
    example: 'Maine Coon',
    description: 'List Users for pagefilter on frontend, using query parameter in username',
  })
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
  // @UseGuards(RolesGuard)
  @ApiBody({ type: UserDto })
  async registerUser(@Body() user: createUser): Promise<createUser> {
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
  @ApiBody({ type: putUser})
  async changeUserCredentials(
    @Param('id') id: string,
    @Body() userUpdate: updateUser,
  ) {
    try {
      return await this.userService.changeUserCredentials(id, userUpdate);
      
    } catch (error) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(JwtAuthGuard)
  @UseGuards(RolesGuard)
  @Delete()
  async deleteUser(@Query('ids') ids: string) {
    try{
      return await this.userService.deleteUsers(ids.split(','));

    }catch(error){
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);

    }
  }
}
