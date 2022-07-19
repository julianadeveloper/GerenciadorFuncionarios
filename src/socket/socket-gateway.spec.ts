import { TestingModule, Test } from '@nestjs/testing';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { EventEmitter } from 'stream';
import { AppGateway } from './socket-test.gateway';
import { SocketService } from './socket-test.service';


describe('AppGateway', () => {
  let appGateway: AppGateway;
  let serverSocket  : Server<OnGatewayInit>
  let serverConnect = WebSocketGateway();


beforeEach(async () => {
  let gateway : Server=  new WebSocketGateway()

    const testSocketMock = {
      afterInit: jest.fn().mockImplementation(),
      emit: jest.fn(),
      serverConnect: jest.fn().mockImplementation(),
      on: jest.fn().mockResolvedValue(AppGateway)
    }
  const module: TestingModule = await Test.createTestingModule({
    providers: [AppGateway],
  }).compile();

const socketService = module.get<AppGateway>(AppGateway);
});
test('should be defined', () => {
  expect(AppGateway).toBeDefined();
  expect(serverConnect).toBeDefined();

});

// describe('Server Connect', ()=>{
//   it('Server connect', ()=>{

//       jest.spyOn(appGateway, 'afterInit')
//       .mockImplementation()
 
//   })
// })
})