import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { NewUserDto } from './dto/newUser.dto';
import { UsersService } from './user.service';
import { RolesGuard } from 'src/middlewares/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @Post()
  @UseGuards(RolesGuard)
  async create(@Body() newUserDto: NewUserDto) {
    return this.service.createUser(newUserDto);
  }

  //   @Get()
  //   async getAll() {
  //     return this.service.getFuncionarios();
  //   }   

  //   @Get(':id')
  //   async getById(@Param('id') id: string) {
  //     return this.service.getObraById(id);
  //   }
}
