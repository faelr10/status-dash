import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TaxesService } from 'src/impostos/taxes.service';
import { IObraRepository, IObraService, ObrasData } from '../structure';
import { NewObraDto } from '../dto/newObra';
import { DadosObras, Obras } from '@prisma/client';
import { NewDetailsObraDto } from '../dto/newDetailsObra';
import { ObrasRepository } from '../obras.repository';

@Injectable()
export class ObrasService implements IObraService {
  constructor(
    private readonly taxesService: TaxesService,
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
    const obras = await this.repository.getObras();
    return obras;
  }

  async getObraById(id: string): Promise<ObrasData> {
    const obra = await this.repository.getObraById(id);
    if (!obra) {
      throw new BadRequestException('Obra not found');
    }
    const data_obra = await this.taxesService.CalculatedAllImpostos(obra);
    const obraData: ObrasData = {
      id: obra.id,
      name: obra.nome,
      construction_company: obra.construtora,
      final_value: obra.valor_final,
      taxes_obra: obra.TaxesObra,
      data_obra,
    };
    return obraData;
  }

  async addDetailsObra(data: NewDetailsObraDto): Promise<DadosObras> {
    const obra = await this.repository.getObraById(data.obra_id);
    if (!obra) {
      throw new BadRequestException('Obra not found');
    }
    const newDetailsObra = await this.repository.addDetailsObra(data);
    return newDetailsObra;
  }
}
