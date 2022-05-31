import { IsNotEmpty } from "class-validator";

export class updateUser {
    
    @IsNotEmpty({message: 'Matricula obrigatoria'})
    _id: string;
    username: string;
    @IsNotEmpty({message: 'Nome de usuário obrigatório'})
    name: string;
    @IsNotEmpty({message: 'Preencha a senha'})
    password: string;
}