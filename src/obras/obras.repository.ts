import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IObraRepository } from './structure';
import { NewObraDto } from './dto/newObra';
import { Obras } from '@prisma/client';

@Injectable()
export class ObrasRepository implements IObraRepository {
  constructor(private prisma: PrismaService) {}

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
          include: { funcionario: true },
        },
      },
    });
  }
}
