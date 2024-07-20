import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { IFuncionariosService } from './structure';
import { NewFuncionarioDto } from './dto/newFuncionario.dto';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    @Inject(FuncionariosService) private readonly service: IFuncionariosService,
  ) {}

  @Get()
  async getFuncionarios() {
    return this.service.getFuncionarios();
  }

  @Post()
  async createFuncionario(@Body() newFuncionarioData: NewFuncionarioDto) {
    return this.service.newFuncionario(newFuncionarioData);
  }

  //   @Get(':id')
  //   async getDespesaById(@Param('id') id: string) {
  //     return this.service.getObraById(id);
  //   }
}
