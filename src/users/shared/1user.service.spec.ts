import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { AppGateway } from '../../socket/socket-test.gateway';
import { createUser } from './dto/create-user.dto';
import { User } from './user';
import { Userservice } from './user.service';

const userEntityList: User[] = [

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
      find: jest.fn().mockResolvedValue(userEntityList),
      findById: jest.fn(),
      findOne: jest.fn(),
      encodePwd: jest.fn(),
      create: jest.fn().mockResolvedValue( {
      username: 'testUser1',
      password: '123456',
      name: 'teste1',
      role: 'operador',
      }),
      emitnewUser: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      emitupdateUser: jest.fn(),
      findOneAndDelete: jest.fn(),
      emitRemoveUser: jest.fn(),
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
  });

  // ListUser é uma função
  describe('findAll', () => {
    it('UserList retorna uma função', async () => {
      expect(userService.listUsers).toBe(userService.listUsers);
   });

   
    // Se listUser Retorna um Array com dados do usuário
    // it('Retorna com sucesso uma lista (array) de users', async () => {
    //   const result = await userService.listUsers(async () => await [User]);
    //   expect(result).toEqual(userModelTest);
    //   //testando se meu user está sendo chamado pelo menos 1 vez.
    //   expect(userRepository.find).toHaveBeenCalledTimes(1);
    // });

    it('Retorna com sucesso uma lista (array) de users', async () => {
      const result = await userService.listUsers([User]);
      expect(result).toEqual(userEntityList);
      //testando se meu user está sendo chamado pelo menos 1 vez.
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  })}
)