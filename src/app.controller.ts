import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { AuthService } from './auth/auth.service';



@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  
  async login(@Request() req) {

    return this.authService.login(req.user);
  }

}
