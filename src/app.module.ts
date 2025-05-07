import { Module } from '@nestjs/common';
import { ChampagneModule } from './champagne/champagne.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ChampagneModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
