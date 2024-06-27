import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ObrasController } from './obras.controller';
import { ObrasService } from './obras.service';
import { ObrasRepository } from './obras.repository';

@Module({
  controllers: [ObrasController],
  providers: [ObrasService, ObrasRepository, PrismaService],
})
export class ObrasModule {}
