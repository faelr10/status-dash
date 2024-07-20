import {
  Injectable,
  CanActivate,
  ExecutionContext,
  applyDecorators,
  SetMetadata,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import * as base64 from 'base-64';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const tokenBearer = context.switchToHttp().getRequest()
      .headers.authorization;
    if (!tokenBearer) throw new UnauthorizedException('Token is required');

    const tokenDecoded = String(tokenBearer.split(' ')[1]);
    if (tokenDecoded === 'undefined')
      throw new UnauthorizedException('Token is required');

    try {
      const publicKey = base64.decode(process.env.SECRET_PUB_KEY);
      Object(jwt.verify(tokenDecoded, publicKey, { algorithms: ['RS256'] }));
      return true;
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
