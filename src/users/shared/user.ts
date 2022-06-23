import { Exclude } from 'class-transformer';

export class User {
  _id: string;
  username: string;
  name: string;
  @Exclude()
  password: string;

  role: string;
}
