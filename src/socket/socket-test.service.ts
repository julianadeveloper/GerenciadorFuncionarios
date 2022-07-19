import { Injectable } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'http';

@Injectable()
@WebSocketGateway()
export class SocketService {
  @WebSocketServer()
  server: Server;

}
