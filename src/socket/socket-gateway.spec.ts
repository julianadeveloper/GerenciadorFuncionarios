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


// describe("my awesome project", () => {
//   let io, serverSocket, clientSocket;

//   beforeAll((done) => {
//     const httpServer = createServer();
//     io = new Server(httpServer);
//     httpServer.listen(() => {
//       const port = httpServer.address().port;
//       clientSocket = new Client(`http://localhost:${port}`);
//       io.on("connection", (socket) => {
//         serverSocket = socket;
//       });
//       clientSocket.on("connect", done);
//     });
//   });

//   afterAll(() => {
//     io.close();
//     clientSocket.close();
//   });

//   test("should work", (done) => {
//     clientSocket.on("hello", (arg) => {
//       expect(arg).toBe("world");
//       done();
//     });
//     serverSocket.emit("hello", "world");
//   });

//   test("should work (with ack)", (done) => {
//     serverSocket.on("hi", (cb) => {
//       cb("hola");
//     });
//     clientSocket.emit("hi", (arg) => {
//       expect(arg).toBe("hola");
//       done();
//     });
//   });
// });