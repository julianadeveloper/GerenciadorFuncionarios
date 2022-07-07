import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketTestModule } from './socket/socket-test.module';
import { AppGateway } from './socket/socket-test.gateway';
//mongodb://localhost:27017/desafioback
//'mongodb+srv://juliana:root@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
//  'mongodb+srv://juliana:root1@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://juliana:root1@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
    ),
    SocketTestModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
