import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(
  3001,

  {
    cors: {
      origin: '*',
    },
  },
)
export class AppGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('home')
  handleEvent(
    @MessageBody() data: string,
    @ConnectedSocket() client: Socket,
  ): string {
    console.log('teste');
    return data;
  }

}
