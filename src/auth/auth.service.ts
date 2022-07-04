import { Userservice } from '../users/shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Criptography } from 'src/users/shared/utils/bcrypt';
import { AppGateway } from 'src/socket/socket-test.gateway';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: Userservice,
    private readonly jwtService: JwtService,
    private readonly socketId: AppGateway,
  ) {}

  
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);

    if (user &&  (await Criptography.decode(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }

    return null;
  }
  async login(data: any) {
    //gerei meu id. 
    const sessionId = await Math.floor(Math.random() * 201) + 3
    const user = await this.userService.listUserGet(data.username);
    const payload = { username: data.username, id: user._id, role: user.role, sessionId: user.sessionId};
    user.sessionId = sessionId;

    if(user.sessionId && user.username){
      this.userService.logoutUser(user)
      console.log('este usuario ja esta logado!')

    } 
    // no objeto do user t em o role (user.role)
    return {role: user.role, 
      access_token: this.jwtService.sign(payload),
    };
  }
}
