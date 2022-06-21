import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SocketTestModule } from './socket-test/socket-test.module';


@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forRoot(
      'mongodb+srv://juliana:root@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority',
    ),
    SocketTestModule,
  ],
  controllers: [ AppController],
  providers: [AppService],
})
export class AppModule {}
