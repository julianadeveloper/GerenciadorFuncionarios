import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersModule } from '../src/users/shared/users.module';
import { Userservice } from '../src/services/user.service';
import { AppModule } from 'src/app.module';

describe('Cats', () => {
  let app: INestApplication;
  let userService = { findAll: () => ['test'] };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(Userservice)
      .useValue(Userservice)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer()).get('/users').expect(200).expect({
      data: userService.findAll(),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});