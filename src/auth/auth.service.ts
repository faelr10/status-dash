import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { IUsersRepository } from 'src/users/structure';
import { UsersRepository } from 'src/users/user.repository';
import { LoginDto } from './dto/login.dto';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as base64 from 'base-64';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersRepository) private readonly user_repository: IUsersRepository,
  ) {}

  async login(data: LoginDto): Promise<any> {
    try {
      const verifyExists = await this.user_repository.exists({
        email: data.email,
      });
      if (!verifyExists)
        throw new ForbiddenException('Email or Password invalid!');

      const verifyPassword = await bcrypt.compare(
        data.password,
        verifyExists.password,
      );
      if (!verifyPassword)
        throw new ForbiddenException('Email or Password invalid!');

      const privatekey = base64.decode(process.env.SECRET_PRIV_KEY);
      const token = jwt.sign(
        {
          id: verifyExists.id,
          is_admin: verifyExists.is_admin,
        },
        privatekey,
        {
          expiresIn: '4h',
          algorithm: 'RS256',
        },
      );
      return { token, id: verifyExists.id };
    } catch (error) {
      throw error;
    }
  }
}
