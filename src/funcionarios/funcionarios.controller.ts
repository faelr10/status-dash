import { Controller, Get, Inject } from '@nestjs/common';
import { FuncionariosService } from './funcionarios.service';
import { IFuncionariosService } from './structure';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    @Inject(FuncionariosService) private readonly service: IFuncionariosService,
  ) {}

  @Get()
  async getFuncionarios() {
    return this.service.getFuncionarios();
  }

  //   @Get(':id')
  //   async getDespesaById(@Param('id') id: string) {
  //     return this.service.getObraById(id);
  //   }
}
