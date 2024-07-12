import { Module } from '@nestjs/common';
import { ObrasModule } from './obras/obras.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { CargosModule } from './cargos/cargos.module';

@Module({
  imports: [ObrasModule, FuncionariosModule, CargosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
