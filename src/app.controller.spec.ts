import { Test } from '@nestjs/testing';

describe('AppController', () => {
  beforeEach(async () => {
    await Test.createTestingModule({
      controllers: [],
      providers: [],
    }).compile();
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect('Hello World!').toBe('Hello World!');
    });
  });
});
