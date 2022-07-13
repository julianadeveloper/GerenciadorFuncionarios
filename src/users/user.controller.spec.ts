import {UsersController} from './users.controller'
import {Userservice} from './shared/user.service'
import { Param } from '@nestjs/common';

describe('UserController', () => {
  let usersController: UsersController;
  let usersService: Userservice;

  beforeEach(() => {
    // usersService = new usersService(usersController);
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = [{username:'teste'}];
      expect(await usersController.listUsers).toBe(result);
    });
  });
});