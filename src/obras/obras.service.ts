import { BadRequestException, Injectable } from '@nestjs/common';
import { IObraService } from './structure';
import { NewObraDto } from './dto/newObra';
import { Obras } from '@prisma/client';

@Injectable()
export class ObrasService implements IObraService {
  //constructor(private readonly repository: ConstructionRepository) {}

  async newObra(obra: NewObraDto): Promise<Obras> {
    const verifyExistObra = await this.repository.getObraByName(obra.nome);
    if (verifyExistObra) {
      throw new BadRequestException('Obra already exists');
    }
    const newObra = await this.repository.newObra(obra);
    return newObra;
  }
}
