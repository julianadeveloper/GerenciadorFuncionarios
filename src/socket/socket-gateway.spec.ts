import { Test, TestingModule } from '@nestjs/testing';
import { AppGateway } from './socket-test.gateway';
import { SocketService } from './socket-test.service';

describe('AppGateway', () => {
  let appGateway: AppGateway;
  let socketService: SocketService;

  beforeEach(async () => {
    let newService = new SocketService();

    const testSocketMock = {
      afterInit: jest.fn().mockImplementation(),
      emit: jest.fn(),
      serverConnect: jest.fn().mockImplementation(),
      on: jest.fn().mockResolvedValue(AppGateway),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketService, AppGateway],
    }).compile();

    const socketService = module.get<SocketService>(SocketService);
    const appGateway = module.get<AppGateway>(AppGateway);
  });
  test('should be defined', () => {
    expect(AppGateway).toBeDefined();
    expect(SocketService).toBeDefined();
  });


});
