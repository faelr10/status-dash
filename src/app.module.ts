import { Module } from '@nestjs/common';
import { ConstructionModule } from './construction/const.module';
import { ObrasModule } from './obras/obras.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';

@Module({
  imports: [ConstructionModule, ObrasModule, FuncionariosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
