import { Module } from '@nestjs/common';
import { ChampagneController } from './champagne.controller';
import { ChampagneService } from './champagne.service';

@Module({
  controllers: [ChampagneController],
  providers: [ChampagneService],
})
export class ChampagneModule {}
