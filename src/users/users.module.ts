import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserSchema } from './schemas/user.schema';
import { Userservice } from '../services/user.service';
import { UsersController } from '../controllers/users.controller';
import { RolesGuard } from '../auth/roles/roles.guard';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { AppGateway } from '../socket/socket.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1000s' },
    }),
  ],
  controllers: [UsersController],
  providers: [AppGateway, Userservice, RolesGuard],
  exports: [Userservice, RolesGuard],
})
export class UsersModule {}
