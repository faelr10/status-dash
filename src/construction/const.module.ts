import { Module } from '@nestjs/common';
import { ConstructionController } from './const.controller';
import { ConstructionService } from './const.service';
import { ConstructionRepository } from './const.repository';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ConstructionController],
  providers: [ConstructionService, ConstructionRepository, PrismaService],
})
export class ConstructionModule {}
