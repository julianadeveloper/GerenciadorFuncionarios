import { INestApplication } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';

import { Test, TestingModule } from '@nestjs/testing';
import { UsersModule } from '../users/users.module';
import * as request from 'supertest';
import { AppModule } from '../app.module';
import { User } from '../users/shared/enitity/user';
import { Userservice } from '../services/user.service';

describe('Users', () => {
  let app: INestApplication;


  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
               imports: [ 
                AppModule
      ],
      providers:[Userservice]
      [getConnectionToken('users')]
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();

  })
  it('/ (GET)', async () => {
    const response = await request(app.getHttpServer())
      .get('/')
      expect(response.statusCode).toEqual(201);
  });
});
