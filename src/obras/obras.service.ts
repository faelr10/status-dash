import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IObraRepository, IObraService } from './structure';
import { NewObraDto } from './dto/newObra';
import { Obras } from '@prisma/client';
import { ObrasRepository } from './obras.repository';

@Injectable()
export class ObrasService implements IObraService {
  constructor(
    @Inject(ObrasRepository) private readonly repository: IObraRepository,
  ) {}

  async newObra(obra: NewObraDto): Promise<Obras> {
    const verifyExistObra = await this.repository.getObraByName(obra.nome);
    if (verifyExistObra) {
      throw new BadRequestException('Obra already exists');
    }
    const newObra = await this.repository.newObra(obra);
    return newObra;
  }

  async getObras(): Promise<Obras[]> {
    return this.repository.getObras();
  }

  async getObraById(id: string): Promise<Obras> {
    return this.repository.getObraById(id);
  }
}
