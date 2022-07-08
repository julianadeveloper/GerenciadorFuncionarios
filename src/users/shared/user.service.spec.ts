import { Test, TestingModule } from '@nestjs/testing';
import { Userservice } from './user.service';

describe('userservice', () => {
  let provider: Userservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Userservice],
    }).compile();

    provider = module.get<Userservice>(Userservice);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
