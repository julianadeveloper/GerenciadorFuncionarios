import { Userservice } from '../users/shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Criptography } from 'src/users/shared/utils/bcrypt';
import { AppGateway } from 'src/socket/socket-test.gateway';
import { UserDto } from 'src/users/shared/dto/user.dto';
import { User } from 'src/users/shared/user';

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
    // buscar o usuario banco pelo username
    // vai ter o bjeto do user.
    
    const user = await this.userService.listUserGet(data.username);
    const payload = { username: data.username, id: user._id, role: user.role };
    // console.log(payload)}
    console.log('fiz login')
    // console.log(payload)
    //vou emitir o evento de login aqui
    this.socketId.emitUserLogged(user.id)
    // no objeto do user t em o role (user.role)
    return {role: user.role, 
      access_token: this.jwtService.sign(payload),
    };
  }
}
