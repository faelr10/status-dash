import { Injectable } from '@nestjs/common';
import { IFuncionariosRepository } from './structure';
import { Funcionarios, PrismaClient } from '@prisma/client';
import { NewFuncionarioDto } from './dto/newFuncionario.dto';

@Injectable()
export class FuncionariosRepository implements IFuncionariosRepository {
  constructor(private readonly prisma: PrismaClient) {}

  getFuncionarioByName(nome: string): Promise<Funcionarios | null> {
    return this.prisma.funcionarios.findFirst({ where: { nome } });
  }

  newFuncionario(obra: NewFuncionarioDto): Promise<Funcionarios> {
    return this.prisma.funcionarios.create({
      data: {
        nome: obra.nome,
        cargo_id: obra.cargo,
      },
    });
  }

  getFuncionarios(): Promise<Funcionarios[]> {
    return this.prisma.funcionarios.findMany();
  }
}
