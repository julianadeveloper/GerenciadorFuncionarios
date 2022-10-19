import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guards';
import { AuthService } from './auth/auth.service';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './users/shared/dto/user-login.dto';
@Controller()
export class AppController {
  constructor(private authService: AuthService) {}
  // @ApiOperation({ summary: 'summary goes here' })
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginDto})

  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
