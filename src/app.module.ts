import { Module } from '@nestjs/common';
import { ObrasModule } from './obras/obras.module';
import { FuncionariosModule } from './funcionarios/funcionarios.module';
import { CargosModule } from './cargos/cargos.module';
import { UsersModule } from './users/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ObrasModule,
    FuncionariosModule,
    CargosModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
