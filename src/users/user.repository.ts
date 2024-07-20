import { Injectable } from '@nestjs/common';
import { PrismaClient, Users } from '@prisma/client';
import { IUsersRepository } from './structure';
import { NewUserDto } from './dto/newUser.dto';

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaClient) {}

  createUser(data: NewUserDto): Promise<Users> {
    return this.prisma.users.create({ data });
  }

  exists(where: Partial<Users>): Promise<any> {
    return this.prisma.users.findFirst({
      where,
    });
  }
}
