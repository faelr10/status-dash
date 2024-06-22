import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ConstructionService } from './const.service';
import { AddDespesaDto } from './dto/addDespesas.dto';

@Controller('construction')
export class ConstructionController {
  constructor(private readonly constructionService: ConstructionService) {}

  @Get()
  getHello() {
    return this.constructionService.getAllConstructions();
  }

  @Post('addDespesa')
  async addDespesa(@Body() addDespesaDto: AddDespesaDto) {
    return this.constructionService.addDespesa({
      obraId: addDespesaDto.obrasId,
      descricao: addDespesaDto.descricao,
      valor: addDespesaDto.valor,
    });
  }

  //get para buscar despesas por obra
  @Get('getDespesas/:id')
  async getDespesas(@Param('id') id: string) {
    return this.constructionService.getDespesas(id);
  }
}
