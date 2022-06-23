import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
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
export class AppGateway implements OnGatewayConnection {
  handleConnection(client: any, ...args: any[]) {
    const sessionStorage = 
    console.log(client.id) //retorna o socket id do cliente (não é o id do banco!)
  }

  //método para emitir meus eventos.
  @WebSocketServer()
  server: Server;


  //ouvir meus eventos.
  @SubscribeMessage('home')
  handleEvent(
    client: Socket,
    
    @ConnectedSocket()  data: string,
    ) {
            
    
    return client;
  }
}
