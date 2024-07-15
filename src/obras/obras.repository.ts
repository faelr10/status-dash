import { Injectable } from '@nestjs/common';
import { IObraRepository, TaxesData } from './structure';
import { NewObraDto } from './dto/newObra';
import { DadosObras, Obras, PrismaClient, TaxesObra } from '@prisma/client';
import { NewDetailsObraDto } from './dto/newDetailsObra';

@Injectable()
export class ObrasRepository implements IObraRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async getObraByName(nome: string): Promise<Obras> {
    return this.prisma.obras.findFirst({
      where: { nome },
    });
  }

  async newObra(obra: NewObraDto): Promise<Obras> {
    return this.prisma.obras.create({ data: obra });
  }

  async getObras(): Promise<Obras[]> {
    return this.prisma.obras.findMany();
  }

  async getObraById(id: string): Promise<Obras> {
    return this.prisma.obras.findFirst({
      where: { id },
      include: {
        DadosObras: {
          include: {
            funcionario: {
              include: { cargo: true },
            },
          },
        },
        TaxesObra: true,
      },
    });
  }

  async addDetailsObra(data: NewDetailsObraDto): Promise<DadosObras> {
    return this.prisma.dadosObras.create({
      data: {
        date: new Date(data.date),
        obra_id: data.obra_id,
        funcionario_id: data.responsaveis[0].profissional,
        horas_trabalhadas: data.responsaveis[0].horas,
      },
    });
  }

  async registerTaxe(data: TaxesData): Promise<TaxesObra> {
    return this.prisma.taxesObra.create({
      data: {
        name: data.name,
        date: new Date(data.date),
        obra_id: data.obra_id,
        value: data.value,
      },
    });
  }
}
