import { Module } from '@nestjs/common';
import { SocketService } from './socket-test.service';
import { AppGateway } from './socket-test.gateway';
import { UsersModule } from '../users/users.module';

@Module({
  providers: [AppGateway, SocketService],
})
export class SocketTestModule {}
