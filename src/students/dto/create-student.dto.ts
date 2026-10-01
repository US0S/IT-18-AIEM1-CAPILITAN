import { IsNotEmpty, IsOptional, IsNumber, IsString } from "class-validator";

export class CreateStudentDto {
    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    programId?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;    
}
