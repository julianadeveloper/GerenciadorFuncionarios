import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
@Injectable()
export class RolesGuard implements CanActivate {
  
  constructor(private readonly jwtService: JwtService,
    ){}
  
  canActivate(
    context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      const request: Request = context.switchToHttp().getRequest()
      const token = request.headers.authorization

      
      const { role } = this.jwtService.decode(token.split(' ')[1]) as { role: string }
      if(role === 'admin'){
        return true;
      } else {
        throw new UnauthorizedException('Esta requisição só poderá ser feita por um usuário administrativo');
      }
    } 

  }
