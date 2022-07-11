import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AppGateway } from '../../socket/socket-test.gateway';
import { UserSchema } from '../schemas/user.schema';
import { UsersModule } from '../users.module';
import { Userservice } from './user.service';

describe('userservice', () => {
  let provider: Userservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule, AppModule, MongooseModule.forFeature([{ name: 'User', schema: UserSchema}])],
      providers: [Userservice, AppGateway],
    
    }).compile();

    provider = module.get<Userservice>(Userservice);
  }).

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
