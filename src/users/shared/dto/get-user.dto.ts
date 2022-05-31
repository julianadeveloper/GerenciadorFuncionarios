
import { IsNotEmpty } from "class-validator";

export class getUserId {
    
    @IsNotEmpty({message: 'id obrigatorio'})
    _id: string;

    

}