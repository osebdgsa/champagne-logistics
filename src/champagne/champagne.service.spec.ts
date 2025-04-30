import { Test, TestingModule } from '@nestjs/testing';
import { ChampagneService } from './champagne.service';

describe('ChampagneService', () => {
  let service: ChampagneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChampagneService],
    }).compile();

    service = module.get<ChampagneService>(ChampagneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
