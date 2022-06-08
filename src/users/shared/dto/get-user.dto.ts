
import { IsNotEmpty } from "class-validator";

export class getUser {
    
    @IsNotEmpty({message: 'username obrigatorio'})
    username: string;

    

}