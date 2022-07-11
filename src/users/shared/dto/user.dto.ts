import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  static username: string;
  static password: string;
  static role: string;

  // constructor(users?: Partial<UserDto>) {
  //   this.name = UserDto?.name;
  //   this.username = UserDto?.username,
  //   this.password = UserDto?.password,
  //   this.role = UserDto?.role
  // }

  @ApiProperty()
  username: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  password: string;

  role: string;
}
