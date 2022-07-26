import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Userservice } from '../src/services/user.service';
import { AppModule } from '../src/app.module';

describe('Users', () => {
  let app: INestApplication;
  let userService: Userservice;

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
      data: userService.listUserGet(''),
    });
  });

  afterAll(async () => {
    await app.close();
  });
});