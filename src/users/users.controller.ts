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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { createUser } from './shared/dto/create-user.dto';
import { getUserId } from './shared/dto/get-user.dto';
import { updateUser } from './shared/dto/update-user.dto';
import { User } from './shared/user';
import { Userservice } from './shared/user.service';

@Controller('users')

export class UsersController {
  constructor(private readonly userService: Userservice) {}


  @Get()
 async listUsers(User): Promise<User[]> {
    return await this.userService.listUsers();
  }
  

 @UseGuards(JwtAuthGuard)
  @Get(':id')
  async listUserId(@Param('id') id: string): Promise<getUserId> {
    
    return await this.userService.listUserId(id) ;
  }

  
  @Post()
  async registerNewUser(@Body() user: createUser): Promise<createUser> {
    return await this.userService.registerNewUser(user);
  }
   

  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Put(':id')
 async  changeUserCredentials(@Param('id') id: string, @Body() userUpdate: updateUser){
    return await this.userService.changeUserCredentials(id, userUpdate);
  }

  @UseGuards(JwtAuthGuard)
  @SetMetadata('roles', ['admin'])
  @Delete()
 async deleteUser(@Query('ids') ids: string) {

    return await this.userService.deleteUsers(ids.split(','));
  }


}
