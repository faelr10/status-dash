import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { NewObraDto } from './dto/newObra';
import { IObraService } from './structure';
import { ObrasService } from './obras.service';

@Controller('obras')
export class ObrasController {
  constructor(@Inject(ObrasService) private readonly service: IObraService) {}

  @Post()
  async addDespesa(@Body() newObraData: NewObraDto) {
    console.log(newObraData);
    return this.service.newObra(newObraData);
  }

  @Get()
  async getDespesas() {
    return this.service.getObras();
  }

  @Get(':id')
  async getDespesaById(@Param('id') id: string) {
    return this.service.getObraById(id);
  }
}
