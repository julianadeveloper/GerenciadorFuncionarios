import { Test, TestingModule } from '@nestjs/testing';
import { Shared } from './shared/shared';

describe('Shared', () => {
  let provider: Shared;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Shared],
    }).compile();

    provider = module.get<Shared>(Shared);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
