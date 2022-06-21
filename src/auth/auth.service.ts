import { Userservice } from '../users/shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Criptography } from 'src/users/shared/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: Userservice,
    private readonly jwtService: JwtService,
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
    // buscar o usuario banco pelo username
    // vai ter o bjeto do user.
    // no objeto do user tem o role (user.role)

    const user = await this.userService.listUserGet(data.username);
    const payload = { username: data.username, id: user._id, role: user.role };
    
    console.log(payload)
    return { role: user.role, 
      access_token: this.jwtService.sign(payload),
    };
  }
}
