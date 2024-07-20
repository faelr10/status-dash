import { Module } from '@nestjs/common';
import { ObrasController } from './obras.controller';
import { ObrasRepository } from './obras.repository';
import { PrismaClient } from '@prisma/client';
import { TaxesObrasService } from './service/taxesObras.service';
import { ObrasService } from './service/obras.service';
import { TaxesService } from '../impostos/taxes.service';

@Module({
  controllers: [ObrasController],
  providers: [
    ObrasService,
    TaxesService,
    TaxesObrasService,
    ObrasRepository,
    PrismaClient,
  ],
})
export class ObrasModule {}
