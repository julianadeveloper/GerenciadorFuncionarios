import { ApiProperty } from "@nestjs/swagger";

export class UserDto{
    @ApiProperty()
    username: string;

    @ApiProperty()
    name: string;
    
    @ApiProperty()
    password: string;
    
    role: string
}