import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Cargos } from '@prisma/client';
import { ICargoRepository, ICargoService } from './structure';
import { NewCargoDto } from './dto/newCargo.dto';
import { CargosRepository } from './cargos.repository';

@Injectable()
export class CargosService implements ICargoService {
  constructor(
    @Inject(CargosRepository) private readonly repository: ICargoRepository,
  ) {}

  async newCargo(data: NewCargoDto): Promise<Cargos> {
    const verifyCargo = await this.repository.getCargosByName(data.nome);
    if (verifyCargo) {
      throw new BadRequestException('Cargo já existe');
    }

    const newCargo = this.repository.newCargo(data);
    return newCargo;
  }

  async getAllCargos(): Promise<Cargos[]> {
    return this.repository.getAllCargos();
  }
}
