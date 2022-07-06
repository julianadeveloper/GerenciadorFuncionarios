import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';


export class updateUser {
  @ApiProperty()
  username: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Nome de usuário obrigatório' })
  @ApiProperty()
  name: string;
   @ApiProperty()
  @IsNotEmpty({ message: 'Preencha a senha' })
  password: string;

  role: string;
}
