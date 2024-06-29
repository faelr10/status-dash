import { Module } from '@nestjs/common';
import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';
import { ObrasRepository } from './obras.repository';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository, PrismaClient],
})
export class ObrasModule {}
