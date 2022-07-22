import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './configuration/configuration.module';
import { DatabaseModuleTest } from './dbTest/database.module';
import { AppGateway } from './socket/socket-test.gateway';
import { SocketTestModule } from './socket/socket-test.module';
import { UsersModule } from './users/users.module';
//mongodb://localhost:27017/desafioback
//'mongodb+srv://juliana:root@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
//  'mongodb+srv://juliana:root1@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
@Module({
  imports: [
    AuthModule,
    UsersModule,
    SocketTestModule,
    ConfigurationModule,
    DatabaseModuleTest
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
