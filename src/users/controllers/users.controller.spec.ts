// import { INestApplication } from '@nestjs/common';
// import { getModelToken } from '@nestjs/mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import { Connection } from 'mongoose';
// import { AppModule } from '../../app.module';
// import { DatabaseModuleTest } from '../../dbTest/database.module';
// import { DatabaseService } from '../../dbTest/database.service.';
// import { User } from '../shared/enitity/user';
// import { UsersController } from './users.controller';

// const userEntityList: User[] = [
//   new User({
//     _id: '89d58w5',
//     username: 'testUser',
//     password: '123456',
//     name: 'teste1',
//     role: 'operador',
//     WebSocket: 'mywebsocket1',
//   }),
//   new User({
//     _id: 'd5s5529',
//     username: 'admin',
//     password: '123',
//     name: 'teste2',
//     role: 'admin',
//     WebSocket: 'mywebsocket2',
//   }),
// ];
// describe('Users Controller', () => {
//   let controller: UsersController;
//   let app: INestApplication;
//   // let userService: Userservice;
//   let connection: Connection;
//   let serviceTest: DatabaseService;


//   beforeAll(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UsersController],
//       providers: [
//         AppModule,
//         {
//           provide: getModelToken('User'),
//           useValue: {
//             listUsers: jest.fn().mockResolvedValue(userEntityList),
//             listUserId: jest.fn().mockReturnValue(userEntityList[0]),
//             listUserGet: jest.fn().mockReturnValue(userEntityList[0]),
//             registerUser: jest.fn().mockReturnValue(userEntityList[0]),
//             changeUserCredentials: jest.fn().mockImplementation(),
//             deleteUser: jest.fn().mockImplementation()
//           },
//         },
//       ],
//     }).compile();
//     connection = module.get<DatabaseService>(DatabaseService).getDbHandle()
//     controller = module.get<UsersController>(UsersController) //executa minha conexão com o db
    
//     app = module.createNestApplication();
//     await app.init();
    
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

// // beforeAll(async () => {
// //   const module: TestingModule = await Test.createTestingModule({
// //     controllers: [UsersController],
// //     providers: [Userservice],
// //   }).overrideProvider(Userservice)
// //   .useValue(Userservice)
// //   .compile();

// // app = module.createNestApplication();
// // await app.init();

// //   // const app = module.createNestApplication();
// //   // await app.init();
// //   userService = module.get<Userservice>(Userservice);

// //   controller = module.get<UsersController>(UsersController); //executa minha conexão com o db
// // });

// // afterAll(async () => {
// //   await app.collection('users').deleteMany({});
// //   await app.close();
// // });

// // describe('getUsers', () => {
// //   it('shloud return an array of users', async () => {
// //     await app.collection('users').insertOne(userStub);

// //     const response = await request(app).get('/users');
// //     expect(response.status).toBe(200);
// //     expect(response.body).toEqual([userStub()]);
// //   });
// // });
