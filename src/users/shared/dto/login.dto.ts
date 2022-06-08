import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class loginUser {
    @ApiProperty()
    @IsNotEmpty({message: 'Matricula obrigatoria'})

    @ApiProperty()
    @IsString()
    username: string;

    @ApiProperty()
    @IsNotEmpty({message: 'Preencha a senha'})
    password: string;
}