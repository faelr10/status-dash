import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.service.login(loginDto);
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
