import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { AppGateway } from '../../socket/socket-test.gateway';
import { UserSchema } from '../schemas/user.schema';
import { UsersModule } from '../users.module';
import { Userservice } from './user.service';

describe('userservice', () => {
  let userService: Userservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        AppModule,
         MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),

      ],
      providers: [Userservice, AppGateway]

    }).compile();

    userService = module.get<Userservice>(Userservice);
  });
  // service foi definido
  test('should be defined', () => {
    expect(userService).toBeDefined();
  });
  // ListUser é uma função
  describe('Users', () => {
    test('UserList retorna uma função', async () => {
      expect(userService.listUsers).toBe(userService.listUsers);
    });

    it('Retorne um item do array', async () => {
      const result = await await userService.listUserId
      expect(result).toEqual('');
    });
  });
});
// describe('UserController', () => {
//   let usersController: UsersController;
//   let usersService: Userservice;

//   beforeEach(() => {
//     // usersService = new usersService(usersController);
//     usersController = new UsersController(usersService);
//   });

//   describe('findAll', () => {
//     it('should return an array of cats', async () => {
//       const result = ['test'];
//       jest.spyOn(usersService, 'listUsers').mockImplementation(() => result['resultado ok']);

//       expect(await usersController.listUsers(UsersController)).toBe(result);
//     });
//   });
// });
