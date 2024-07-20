import { Users } from '@prisma/client';
import { NewUserDto } from './dto/newUser.dto';

export interface IUsersRepository {
  //   getUsers(): Promise<Users[]>;
  //   getUserById(id: string): Promise<Users>;
  createUser(data: NewUserDto): Promise<Users>;
  exists(where: Partial<Users> | any): Promise<any>;
}
