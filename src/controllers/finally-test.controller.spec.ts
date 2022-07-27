import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { Criptography } from 'src/users/shared/utils/bcrypt';
import { AuthService } from '../auth/auth.service';
import { Userservice } from '../services/user.service';
import { User } from '../users/shared/enitity/user';
import { UsersController } from './users.controller';

const updateUserEntity = new User({
  _id: 'userUpdate',
  username: 'userUpdat22e',
  password: '123456',
  name: 'update',
  role: 'operador',
  WebSocket: 'mywebsocket3',
});

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
describe('User Controller', () => {
  let controller: UsersController;
  let service: Userservice;
  let jwtService: AuthService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],

      providers: [
        JwtService,
        {
          provide: Userservice,
          useValue: {
            listUsers: jest.fn().mockResolvedValue(userEntityList),
            listUserGet: jest.fn().mockResolvedValue(userEntityList[1]),
            listUserId: jest.fn().mockReturnValue(userEntityList[0]),
            registerUser: jest.fn().mockReturnValue(userEntityList[1]),
            changeUserCredentials: jest.fn().mockReturnValue(updateUserEntity),
            deleteUsers: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<Userservice>(Userservice);
  });

  describe('User Controller and Service Defined', () => {
    it('should be controller defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('Get Users', () => {
    it('should get an array of users', async () => {
      const result = await controller.listUsers([User]);
      expect(result).toEqual(userEntityList);
    });
    it('Should be return NotFound', () => {
      jest
        .spyOn(controller, 'listUsers')
        .mockRejectedValue(new HttpException('NotFound', HttpStatus.NOT_FOUND));
      expect(controller.listUsers).rejects.toThrowError(HttpException);
    });
  });

  describe('List User Id', () => {
    it('should user by id', async () => {
      const result = await controller.listUserId(userEntityList[0]._id);
      expect(result).toEqual(userEntityList[0]);
      expect(result).toHaveProperty('_id');
      // console.log('find by id result', result)
    });
    it('Should be return NotFound', () => {
      jest
        .spyOn(controller, 'listUserId')
        .mockRejectedValue(new HttpException('NotFound', HttpStatus.NOT_FOUND));
      expect(controller.listUserId).rejects.toThrowError(HttpException);
    });
  });

  describe('List User By Username', () => {
    it('Should user by username', async () => {
      const result = await controller.listUserGet(userEntityList[1].username);
      expect(result).toEqual(userEntityList[1]);
      expect(userEntityList[1]).toHaveProperty('username');
      console.log('result by username:', result.username);
    });

    it('Should be return NotFound Username', () => {
      jest
        .spyOn(controller, 'listUserGet')
        .mockRejectedValue(new HttpException('NotFound', HttpStatus.NOT_FOUND));
      expect(controller.listUserGet).rejects.toThrowError(HttpException);
    });
  });

  describe('Register User', () => {
    it('Register new user sucessfully', async () => {
      const data = {
        _id: '89d58w5',
        username: 'testUser',
        password: '123456',
        name: 'teste1',
        role: 'operador',
        WebSocket: 'mywebsocket1',
      };
      const result = await controller.registerUser(data);

      expect(result).toEqual(userEntityList[1]);
      console.log('result create:', result);
    });

    it('Should be return NotFound Username', () => {
      jest
        .spyOn(controller, 'registerUser')
        .mockRejectedValue(
          new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN),
        );
      expect(controller.registerUser).rejects.toThrowError(HttpException);
    });
  });

  describe('Update User', () => {
    it('Update new data', async () => {
      const data = {
        _id: 'userUpdate',
        username: 'userUpdat22e',
        password: '123456',
        name: 'update',
        role: 'operador',
        WebSocket: 'mywebsocket3',
      };
      const result = await controller.changeUserCredentials('userUpdate', data);

      expect(result).toEqual(updateUserEntity);
      console.log('result update:', result);
    });

    it('Should be return NotFound User', () => {
      jest
        .spyOn(controller, 'changeUserCredentials')
        .mockRejectedValue(
          new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN),
        );
      expect(controller.changeUserCredentials).rejects.toThrowError(
        HttpException,
      );
    });
  });
  describe('Delete User', () => {
    it('Delete data and return undefined', async () => {

      const data = {
        _id: 'userDelet',
        username: 'userDelet',
        password: '123456',
        name: 'update',
        role: 'operador',
        WebSocket: 'mywebsocket3',
      };
      const result = await controller.deleteUser('_id');
      expect(result).toBeUndefined();
      console.log('delet result:', result)

    });

    it('Should be return NotFound User', () => {
      jest
        .spyOn(controller, 'deleteUser')
        .mockRejectedValue(
          new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN),
        );
      expect(controller.deleteUser).rejects.toThrowError(
        HttpException,
      );
    });
  });
});
