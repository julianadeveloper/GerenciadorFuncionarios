import { Module } from '@nestjs/common';
import { AppGateway } from './socket.gateway';

@Module({
  providers: [AppGateway],
})
export class SocketTestModule {}
