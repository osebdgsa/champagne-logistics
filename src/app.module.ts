import { Module } from '@nestjs/common';
import { ChampagneModule } from './champagne/champagne.module';

@Module({
  imports: [ChampagneModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
