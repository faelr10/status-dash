import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UsersService } from './user.service';
import { UsersRepository } from './user.repository';
import { UsersController } from './user.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, PrismaClient],
})
export class UsersModule {}
