import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IFuncionariosRepository } from './structure';
import { Funcionarios } from '@prisma/client';
import { NewFuncionarioDto } from './dto/newFuncionario.dto';

@Injectable()
export class FuncionariosRepository implements IFuncionariosRepository {
  constructor(private prisma: PrismaService) {}

  getFuncionarioByName(nome: string): Promise<Funcionarios | null> {
    return this.prisma.funcionarios.findFirst({ where: { nome } });
  }

  newFuncionario(obra: NewFuncionarioDto): Promise<Funcionarios> {
    return this.prisma.funcionarios.create({ data: obra });
  }

  getFuncionarios(): Promise<Funcionarios[]> {
    return this.prisma.funcionarios.findMany();
  }
}
