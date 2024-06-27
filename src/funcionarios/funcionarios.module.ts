import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { FuncionariosController } from './funcionarios.controller';
import { FuncionariosService } from './funcionarios.service';
import { FuncionariosRepository } from './funcionarios.repository';

@Module({
  controllers: [FuncionariosController],
  providers: [FuncionariosService, FuncionariosRepository, PrismaService],
})
export class FuncionariosModule {}
