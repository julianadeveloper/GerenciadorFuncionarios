import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { AuthService } from './auth/auth.service';
import { response } from 'express';



@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}