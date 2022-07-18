import { TestingModule, Test } from '@nestjs/testing';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AppGateway } from './socket-test.gateway';

beforeEach(async () => {
  // const userMockRepository = {
    let serverSocket = WebSocketServer();
    let Server = WebSocketGateway();

    const testSocketMock = {
      afterInit: jest.fn(),
      emit: jest.fn(),
    }
  const module: TestingModule = await Test.createTestingModule({
    providers: [AppGateway],
  }).compile();

const socketService = module.get<AppGateway>(AppGateway);
socketService;  
});

