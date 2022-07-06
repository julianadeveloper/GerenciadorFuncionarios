import { Userservice } from '../users/shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Criptography } from 'src/users/shared/utils/bcrypt';
import { AppGateway } from 'src/socket/socket-test.gateway';
import { loginUser } from 'src/users/shared/dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: Userservice,
    private readonly jwtService: JwtService,
    private readonly socketId: AppGateway,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user && (await Criptography.decode(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }



  

    async login(data: any) {
    const user = await this.userService.listUserGet(data.username);
    const { id = user._id, username, role } = user;
    const payload = {
      id, username, role
    };
    
    this.socketId.emitUserLogged(user)
    console.log('cheguei')

    return {
    role,
    access_token: this.jwtService.sign(payload),
    username,
    _id: id,
  };
  }

}
