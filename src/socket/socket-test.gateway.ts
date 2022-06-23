import { Injectable } from '@nestjs/common';
import {
  OnGatewayInit, WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway(
  3001,

  {
    cors: {
      origin: '*',
    },
  },
)
export class AppGateway implements OnGatewayInit {
  @WebSocketServer()
  server: Server;

  afterInit(server: Server) {
    server.on('connect', (socket: Socket) => {
      console.log('connected: ', socket.id);
    });

    server.on('disconnect', (socket: Socket) => {
      console.log('socket disconnected: ', socket.id);
    });
  }

  emitRemoveUser(id: string) {
    this.server.emit('removed-user', { id: id });
  }

  // //método para emitir meus eventos.

  // //ouvir meus eventos.
  // @SubscribeMessage('connected')
  // handleEvent(
  //   client: Socket,

  //   @ConnectedSocket() data: string,
  // ) {

  //   return client;
  // }
}
