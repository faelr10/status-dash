import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CargosController } from './cargos.controller';
import { CargosService } from './cargos.service';
import { CargosRepository } from './cargos.repository';

@Module({
  controllers: [CargosController],
  providers: [CargosService, CargosRepository, PrismaClient],
})
export class CargosModule {}
