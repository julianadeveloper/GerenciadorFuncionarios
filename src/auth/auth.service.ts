import { Userservice } from '../users/shared/user.service';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { Criptography } from 'src/users/shared/utils/bcrypt';

@Injectable()
export class AuthService {

    constructor(private userService: Userservice,
      private jwtService: JwtService 

      ) {}
  
    async validateUser(username: string, password
      : string): Promise<any> {


      const user = await this.userService.findOne(username);

      if (user && await Criptography.decode(password, user.password)) {
        const { password, ...result } = user.toObject();
        return result;
      }

      return null;
    }

    async login(user: any) {
      const payload = { username: user.username, sub: user.userId };
      
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
}