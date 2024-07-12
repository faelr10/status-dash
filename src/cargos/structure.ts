import { Cargos } from '@prisma/client';
import { NewCargoDto } from './dto/newCargo.dto';

export interface ICargoService {
  newCargo(newCargoData: NewCargoDto): Promise<Cargos>;
  getAllCargos(): Promise<Cargos[]>;
}

export interface ICargoRepository {
  newCargo(newCargoData: NewCargoDto): Promise<Cargos>;
  getCargosByName(nome: string): Promise<Cargos | null>;
  getAllCargos(): Promise<Cargos[]>;
}
