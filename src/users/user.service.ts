import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from './structure';
import { UsersRepository } from './user.repository';
import { NewUserDto } from './dto/newUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UsersRepository)
    private readonly repository: IUsersRepository,
  ) {}

  async createUser(data: NewUserDto): Promise<any> {
    try {
      const verifyExists = await this.repository.exists({
        email: data.email,
      });
      if (verifyExists) throw new ForbiddenException('Email already register!');

      data.password = await bcrypt.hash(data.password, 10);

      const newUser = await this.repository.createUser(data);
      delete newUser.password;
      return { message: 'User created with success!' };
    } catch (error) {
      throw error;
    }
  }

  //   async getFuncionarios(): Promise<Funcionarios[]> {
  //     return this.repository.getFuncionarios();
  //   }
}
