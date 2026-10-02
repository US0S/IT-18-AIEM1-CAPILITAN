import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAdviserDto {

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    programId?: number;

    @IsNotEmpty()
    @IsString() 
    name: string;
    
    
}
