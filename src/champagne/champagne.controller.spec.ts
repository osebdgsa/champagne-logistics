import { Test, TestingModule } from '@nestjs/testing';
import { ChampagneController } from './champagne.controller';

describe('ChampagneController', () => {
  let controller: ChampagneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChampagneController],
    }).compile();

    controller = module.get<ChampagneController>(ChampagneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
