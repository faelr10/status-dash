import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IFuncionariosRepository, IFuncionariosService } from './structure';
import { Funcionarios } from '@prisma/client';
import { NewFuncionarioDto } from './dto/newFuncionario.dto';
import { FuncionariosRepository } from './funcionarios.repository';

@Injectable()
export class FuncionariosService implements IFuncionariosService {
  constructor(
    @Inject(FuncionariosRepository)
    private readonly repository: IFuncionariosRepository,
  ) {}

  async newFuncionario(data: NewFuncionarioDto): Promise<Funcionarios> {
    const verifyExistObra = await this.repository.getFuncionarioByName(
      data.nome,
    );
    if (verifyExistObra) {
      throw new BadRequestException('Funcionário already exists');
    }
    const newObra = await this.repository.newFuncionario(data);
    return newObra;
  }

  async getFuncionarios(): Promise<Funcionarios[]> {
    return this.repository.getFuncionarios();
  }
}
