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
  describe('findAll', () => {
    it('UserList retorna uma função', async () => {
      expect(userService.listUsers).toBe(userService.listUsers);
   });
    // Se listUser Retorna um Array com dados do usuário
    it('Retorna com sucesso uma lista (array) de users', async () => {
      const result = await userService.listUsers(async () => await [User]);
      expect(result).toEqual(userModelTest);
      //testando se meu user está sendo chamado pelo menos 1 vez.
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
    //erro de exceção:
    it('should throw an exception error', () => {
      jest.spyOn(userRepository, 'find').mockRejectedValueOnce(new Error()),
      expect(userRepository.find()).rejects.toThrowError();
    });
  });
  describe('Retorna array de um User', () => {
    it('Find user or Fail', async () => {
      const result = await userService.listUserGet('1');
      expect(result).toEqual(userModelTest[0]),
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
    });
    //testando se retorna um erro caso quebre 
    it('Erro de exceção', () => {
      jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error());
      expect(userService.findOne('1')).rejects.toThrowError();
    });
  });

  // describe('Create', ()=>{
  //   it('Create New User', async ()=>{
  //     const data : createUser = {
  //       username: 'testUser1',
  //       password: '123456',
  //       name: 'teste1',
  //       role: 'operador',
  //     }
  //     const result = await userService.registerUser(data)
  //     expect(result).toEqual(data)
  //     console.log(result)
      
  //   })

  describe('UpdateUser', ()=>{
    it('Create New User', async ()=>{
      const data : createUser = {
        username: 'lostuser',
        password: '123456',
        name: 'teste3',
        role: 'operador',
      }
      const result = await userService.registerUser(data)

      expect(result).toEqual(userModelTest[0])
      expect(userService.registerUser).toHaveBeenCalledTimes(1);
      expect(userRepository.findOne).toHaveBeenCalledTimes(1);
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      
    })
  })
});
