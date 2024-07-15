import { Inject, Injectable } from '@nestjs/common';
import { TaxesObra } from '@prisma/client';
import { ObrasRepository } from '../obras.repository';
import { IObraRepository, ITaxesObrasService, TaxesData } from '../structure';

@Injectable()
export class TaxesObrasService implements ITaxesObrasService {
  constructor(
    @Inject(ObrasRepository) private readonly repository: IObraRepository,
  ) {}

  async registerTaxe(data: TaxesData): Promise<TaxesObra> {
    try {
      const newTaxe = await this.repository.registerTaxe(data);
      return newTaxe;
    } catch (error) {
      throw new Error(error);
    }
  }
}
