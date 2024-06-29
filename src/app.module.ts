import { Module } from '@nestjs/common';
import { ObrasModule } from './obras/obras.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ObrasModule, FuncionariosModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
