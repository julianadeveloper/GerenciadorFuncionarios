import { IsNotEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';

export class createUser {
  @IsNotEmpty({ message: 'Matricula obrigatoria' })
  username: string;
  @IsNotEmpty({ message: 'Nome de usuário obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'Preencha a senha' })
  password: string;

  role: string;
}
