import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { NewObraDto } from './dto/newObra';
import { IObraService } from './structure';
import { NewDetailsObraDto } from './dto/newDetailsObra';
import { NewTaxeObraDto } from './dto/newTaxesObra';
import { ObrasService } from './service/obras.service';
import { TaxesObrasService } from './service/taxesObras.service';

@Controller('obras')
export class ObrasController {
  constructor(
    @Inject(ObrasService) private readonly service: IObraService,
    @Inject(TaxesObrasService) private readonly taxesService: TaxesObrasService,
  ) {}

  @Post()
  async newObra(@Body() newObraData: NewObraDto) {
    console.log(newObraData);
    return this.service.newObra(newObraData);
  }

  @Get()
  async getObra() {
    return this.service.getObras();
  }

  @Get(':id')
  async getObraId(@Param('id') id: string) {
    return this.service.getObraById(id);
  }

  @Post('/details_obra')
  async addDetailsObra(@Body() newDetailsObraData: NewDetailsObraDto) {
    return this.service.addDetailsObra(newDetailsObraData);
  }

  @Post('/taxes_obra')
  async addTaxesObra(@Body() newTaxesObraData: NewTaxeObraDto) {
    return this.taxesService.registerTaxe(newTaxesObraData);
  }
}
