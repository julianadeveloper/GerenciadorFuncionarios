import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AppGateway } from '../../socket/socket-test.gateway';
import { UsersModule } from '../users.module';
import { Userservice } from './user.service';

describe('userservice', () => {
  let provider: Userservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppGateway, UsersModule, AppModule],
      providers: [Userservice],
    
    }).compile();

    provider = module.get<Userservice>(Userservice);
  }).jest.useFakeTimers()

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
