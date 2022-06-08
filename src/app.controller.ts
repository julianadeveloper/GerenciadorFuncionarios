import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { AuthService } from './auth/auth.service';



@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  
  async login(@Request() req) {
    console.log('login ok')

    return this.authService.login(req.user);
  }
}