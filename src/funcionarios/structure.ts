import { Funcionarios } from '@prisma/client';
import { NewFuncionarioDto } from './dto/newFuncionario.dto';

export interface IFuncionariosService {
  newFuncionario(data: NewFuncionarioDto): Promise<Funcionarios>;
  //   getObras(): Promise<Obras[]>;
  //   getObraById(id: string): Promise<Obras | null>;
}

export interface IFuncionariosRepository {
  getFuncionarioByName(nome: string): Promise<Funcionarios | null>;
  newFuncionario(obra: NewFuncionarioDto): Promise<Funcionarios>;
  //   getObras(): Promise<Obras[]>;
  //   getObraById(id: string): Promise<Obras | null>;
}
