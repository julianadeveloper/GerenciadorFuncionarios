import { Userservice } from '../services/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Criptography } from '../users/shared/utils/bcrypt';
import { AppGateway } from '../socket/socket-test.gateway';
import { User } from '../users/shared/enitity/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: Userservice,
    private readonly jwtService: JwtService,
    private readonly socketId: AppGateway,
  ) {}

  async validateUser(username: string, password: string): Promise<Object> {
    const user = await this.userService.findOne(username);

    if (user && (await Criptography.decode(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }

  async login(data: User) {
    const user = await this.userService.listUserGet(data.username);
    const { _id = user._id, username, role } = user;

    const payload = {
      _id,
      username,
      role,
    };

    this.socketId.emitUserLogged(user);
    console.log('LOGUEI');

    return {
      role,
      access_token: this.jwtService.sign(payload),
      username,
      _id: _id,
    };
  }
}