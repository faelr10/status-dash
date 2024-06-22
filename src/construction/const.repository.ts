import { Injectable } from '@nestjs/common';
import { Despesas } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ConstructionRepository {
  constructor(private prisma: PrismaService) {}

  async getAllConstructions(): Promise<any> {
    return this.prisma.obras.findMany();
  }

  async getObraById(id: string): Promise<any> {
    return this.prisma.obras.findFirst({ where: { id } });
  }

  async addDespesa(addDespesaDto: any): Promise<any> {
    return this.prisma.despesas.create({
      data: {
        descricao: addDespesaDto.descricao,
        valor: addDespesaDto.valor,
        obras: {
          connect: {
            id: addDespesaDto.obraId,
          },
        },
      },
    });
  }

  async getFuncionariosByObra(id: string): Promise<any> {
    return this.prisma.funcionariosObras.findMany({
      where: {
        obrasId: id,
      },
      include: {
        funcionarios: true,
      },
    });
  }

  async getDespesas(id: string): Promise<Despesas[]> {
    const despesas = await this.prisma.despesas.findMany({
      where: {
        obrasId: id,
      },
    });
    return despesas;
  }
}
