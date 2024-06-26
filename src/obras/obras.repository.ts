import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IObraRepository } from './structure';
import { NewObraDto } from './dto/newObra';

@Injectable()
export class ObrasRepository implements IObraRepository {
  constructor(private prisma: PrismaService) {}

  async getObraByName(nome: string): Promise<any> {
    return this.prisma.obras.findFirst({ where: { nome } });
  }

  async newObra(obra: NewObraDto): Promise<any> {
    return this.prisma.obras.create({ data: obra });
  }
}
