import { Body, Controller, Post } from '@nestjs/common';
import { NewObraDto } from './dto/newObra';

@Controller('construction')
export class ConstructionController {
  //constructor(private readonly constructionService: ConstructionService) {}

  @Post('newObra')
  async addDespesa(@Body() newObraData: NewObraDto) {
    return this.constructionService.addDespesa(newObraData);
  }
}
