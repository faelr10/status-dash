import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersRepository } from 'src/users/user.repository';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, PrismaClient],
})
export class AuthModule {}
