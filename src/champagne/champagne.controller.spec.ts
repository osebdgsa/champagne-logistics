import { Test, TestingModule } from '@nestjs/testing';
import { ChampagneController } from './champagne.controller';
import { ChampagneService } from './champagne.service';
import { ConfigModule } from '@nestjs/config'; // <-- Import ConfigModule

describe('ChampagneController', () => {
  let controller: ChampagneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [ChampagneController],
      providers: [ChampagneService],
    }).compile();

    controller = module.get<ChampagneController>(ChampagneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
