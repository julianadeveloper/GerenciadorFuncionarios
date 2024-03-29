import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketTestModule } from './socket/socket-test.module';
import { AppGateway } from './socket/socket-test.gateway';
import { ConfigurationModule } from './configuration/configuration.module';
import { Userservice } from './users/shared/user.service';
//mongodb://localhost:27017/desafioback
//'mongodb+srv://juliana:root@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
//  'mongodb+srv://juliana:root1@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
@Module({
  imports: [
    AuthModule,
    UsersModule,
    SocketTestModule,
    ConfigurationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
