import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { NewCargoDto } from './dto/newCargo.dto';
import { CargosService } from './cargos.service';
import { ICargoService } from './structure';

@Controller('cargos')
export class CargosController {
  constructor(@Inject(CargosService) private readonly service: ICargoService) {}

  @Post()
  async newCargo(@Body() newCargoDto: NewCargoDto) {
    console.log(newCargoDto);
    return this.service.newCargo(newCargoDto);
  }

  @Get()
  async getAllCargos() {
    return this.service.getAllCargos();
  }
}
