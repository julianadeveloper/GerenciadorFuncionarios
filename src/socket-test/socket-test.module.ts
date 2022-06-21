import { Module } from '@nestjs/common';
import { SocketTestService } from './socket-test.service';
import { SocketTestGateway } from './socket-test.gateway';

@Module({
  providers: [SocketTestGateway, SocketTestService]
})
export class SocketTestModule {}
