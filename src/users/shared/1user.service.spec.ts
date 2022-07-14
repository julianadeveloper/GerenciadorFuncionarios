import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppGateway } from '../../socket/socket-test.gateway';
import { createUser } from './dto/create-user.dto';
import { User } from './user';
import { Userservice } from './user.service';

const userModelTest: User[] = [

  new User({
    _id: '89d58w5',
    username: 'testUser1',
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


describe('userservice', () => {
  let userService: Userservice;
  let userRepository: Model<User>;

  beforeEach(async () => {
    const userMockRepository = {
      find: jest.fn().mockResolvedValue(userModelTest),
      findAll: jest.fn().mockResolvedValue(userModelTest),
      findById: jest.fn(),
      findOne: jest.fn().mockResolvedValue(userModelTest[0]),
      registerUser: jest.fn().mockReturnValue(userModelTest[0]),
      exec: jest.fn().mockImplementation(),
      findByIdAndUpdat: jest.fn(),
      findOneAndDelete: jest.fn(),
      listUsers: jest.fn().mockImplementation(),
      create: jest.fn().mockResolvedValue( {
        username: 'testUser1',
        password: '123456',
        name: 'teste1',
        role: 'operador',
      })
    };
    const module: TestingModule = await Test.createTestingModule({

      providers: [
        Userservice,
        AppGateway,
        {
          provide: getModelToken('User'),
          useValue: userMockRepository,
        },
      ],
    }).compile();

    userService = module.get<Userservice>(Userservice);
    userRepository = module.get<Model<User>>(getModelToken('User'));
  });

  // service foi definido
  test('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
    console.log(userRepository)
  });

  // ListUser é uma função
  


});
