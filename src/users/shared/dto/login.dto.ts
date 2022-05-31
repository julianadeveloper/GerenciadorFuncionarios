import { IsNotEmpty, IsString } from "class-validator";

export class loginUser {

    @IsNotEmpty({message: 'Matricula obrigatoria'})
    @IsString()
    username: string;
    @IsNotEmpty({message: 'Preencha a senha'})
    password: string;
}