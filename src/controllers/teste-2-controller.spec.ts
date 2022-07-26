import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Test } from '@nestjs/testing';
import { Connection } from 'mongoose';
import { User } from '../users/shared/enitity/user';
import { UsersModule } from '../users/users.module';
import * as request from 'supertest';
import { UsersController } from './users.controller';
import { Userservice } from '../services/user.service';
import { AppModule } from '../app.module';
describe('User Controller', () => {
  let app: NestExpressApplication;
  let controller: UsersController;
  let service: Userservice;

  const userEntityList: User[] = [
    new User({
      _id: '89d58w5',
      username: 'testUser',
      password: '123456',
      name: 'teste1',
      role: 'operador',
      WebSocket: 'mywebsocket1',
    }),
    new User({
      _id: 'd5s5529',
      username: 'admin',
      password: '123',
      name: 'teste2',
      role: 'admin',
      WebSocket: 'mywebsocket2',
    }),
  ];
  const apiClient = () => {
    // console.log(apiClient);
    return request(app.getHttpServer());
  };

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
         MongooseModule.forRoot('mongodb+srv://juliana:root1@cluster0.1tqbr.mongodb.net/funcionarios?retryWrites=true&w=majority'), // we use Mongoose here, but you can also use TypeORM
        AppModule,
      ],
    }).compile();
    // console.log(app);
    app = moduleRef.createNestApplication<NestExpressApplication>();
    // await app.listen(5555);
  });

  afterEach(async () => {
    // console.log(app.get(getConnectionToken()));
    await (app.get(getConnectionToken('/users')) as Connection)
    // .createCollection('/users');
    await app.close();
  });

  it('creates a post', async () => {
    const response = await apiClient().post('/users').send(userEntityList[0]).expect(404);
    console.log(response)
    // const posts: User[] = (await apiClient().get('/post')).body;
    // expect(posts[0].content).toBe(
    //   'I am all setup with Nestjs and Mongo for more integration testing. TDD rocks!',
    // );
    // expect(posts[0].likes.length).toBe(0);
  });
});
