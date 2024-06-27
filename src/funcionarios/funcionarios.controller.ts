import { Body, Controller, Inject, Post } from '@nestjs/common';
import { NewFuncionarioDto } from './dto/newFuncionario.dto';
import { FuncionariosService } from './funcionarios.service';
import { IFuncionariosService } from './structure';

@Controller('funcionarios')
export class FuncionariosController {
  constructor(
    @Inject(FuncionariosService) private readonly service: IFuncionariosService,
  ) {}

  @Post()
  async addDespesa(@Body() newFuncionarioDto: NewFuncionarioDto) {
    console.log(newFuncionarioDto);
    return this.service.newFuncionario(newFuncionarioDto);
  }

  //   @Get()
  //   async getDespesas() {
  //     return this.service.getObras();
  //   }

  //   @Get(':id')
  //   async getDespesaById(@Param('id') id: string) {
  //     return this.service.getObraById(id);
  //   }
}
