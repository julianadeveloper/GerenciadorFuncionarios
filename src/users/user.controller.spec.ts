import {UsersController} from './users.controller'
import {Userservice} from './shared/user.service'

describe('CatsController', () => {
  let usersController: UsersController;
  let usersService: Userservice;

  beforeEach(() => {
    usersService = new usersService(usersController);
    usersController = new UsersController(usersService);
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const result = ['test'];
      jest.spyOn(catsService, 'findAll').mockImplementation(() => result);

      expect(await catsController.findAll()).toBe(result);
    });
  });
});