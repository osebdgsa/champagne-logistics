import { Test, TestingModule } from '@nestjs/testing';
import { ChampagneService } from './champagne.service';
import { ConfigModule } from '@nestjs/config';

describe('ChampagneService', () => {
  let service: ChampagneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      providers: [ChampagneService],
    }).compile();

    service = module.get<ChampagneService>(ChampagneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
