import { Module } from '@nestjs/common';
import { FuncionariosController } from './funcionarios.controller';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosRepository } from './funcionarios.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [FuncionariosController],
  providers: [FuncionariosService, FuncionariosRepository, PrismaClient],
})
export class FuncionariosModule {}
