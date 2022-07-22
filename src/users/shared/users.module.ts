import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from '../schemas/user.schema';
import { Userservice } from '../../services/user.service';
import { UsersController } from '../controllers/users.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [Userservice],
  exports: [Userservice],
})
export class UsersModule {}
