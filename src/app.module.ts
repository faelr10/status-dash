import { Module } from '@nestjs/common';
import { ObrasModule } from './obras/obras.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';

@Module({
  imports: [ObrasModule, FuncionariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
