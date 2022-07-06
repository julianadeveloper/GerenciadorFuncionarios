import { Injectable } from '@nestjs/common';
import {
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { User } from 'src/users/shared/user';

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

  emitupdateUser(id: string) {
    this.server.emit('update', { id: id });
    console.log('update back');
  }
  emitRemoveUser(id: string) {
    this.server.emit('removed-user', { id: id });
  }
  emitnewUser(user: User) {
    this.server.emit('new-user', user);
  }

  emitUserLogged(_id: User) {
    this.server.emit('is-logged', {_id})
    console.log('user logado');
  }
}
