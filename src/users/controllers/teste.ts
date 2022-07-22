// import { Test, TestingModule } from '@nestjs/testing';
// import { Connection } from 'mongoose';
// import { AppModule } from '../../app.module';
// import { userStub } from '../shared/enitity/user-test';
// import * as request from 'supertest';
// import { MongooseModule } from '@nestjs/mongoose';
// import { DatabaseModuleTest } from '../../dbTest/database.module';
// import { DatabaseService } from '../../dbTest/database.service.';

// describe('Users Controller', () => {
//   let dbConnection: Connection;
//   let httpServer: any;
//   let app: any;
//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       // )
//       imports: [AppModule],
//       providers: [DatabaseModuleTest],
//     }).compile();

//     const app = module.createNestApplication();
//     await app.init();
//     dbConnection = module.get<DatabaseService>(DatabaseService).getDbHandle(); //executa minha conexão com o db
//   });

//   // it('getUsers', async ()=>{
//   //   await dbConnection.collection('users').insertOne(userStub)
//   // })
//   afterAll(async () => {
//     await app.collection('users').deleteMany({});
//     await app.close();
//   });

//   describe('getUsers', () => {
//     it('shloud return an array of users', async () => {
//       await app.collection('users').insertOne(userStub);

//       const response = await request(app).get('/users');
//       expect(response.status).toBe(200);
//       expect(response.body).toEqual([userStub()]);
//     });
//   });
// });
