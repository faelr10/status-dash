import { Injectable } from '@nestjs/common';
import { Cargos, PrismaClient } from '@prisma/client';
import { ICargoRepository } from './structure';
import { NewCargoDto } from './dto/newCargo.dto';

@Injectable()
export class CargosRepository implements ICargoRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getCargosByName(nome: string): Promise<Cargos | null> {
    return this.prisma.cargos.findFirst({ where: { nome } });
  }

  newCargo(data: NewCargoDto): Promise<Cargos> {
    return this.prisma.cargos.create({ data });
  }

  getAllCargos(): Promise<Cargos[]> {
    return this.prisma.cargos.findMany();
  }
}
