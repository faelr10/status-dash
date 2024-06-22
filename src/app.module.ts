import { Module } from '@nestjs/common';
import { ConstructionModule } from './construction/const.module';

@Module({
  imports: [ConstructionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
