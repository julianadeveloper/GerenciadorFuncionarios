import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { AppGateway } from 'src/socket/socket-test.gateway';
import { Userservice } from 'src/services/user.service';
import { RolesGuard } from 'src/auth/roles/roles.guard';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

describe('User Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UsersModule,
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])
      ],
      providers: [Userservice]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
  
  });
});
// import {UsersController } from './users.controller';
// import { User } from './shared/enitity/user';
// import { Model } from 'mongoose';
// import { Userservice } from 'src/services/user.service';

// describe('CatsController', () => {
//   let usersController: UsersController;
//   let usersService: Userservice;
//   let userRepository: Model<User>;

//   beforeEach(() => {
//     usersController = new UsersController(usersService);
//   });

// });