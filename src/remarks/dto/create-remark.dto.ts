import { IsNumber, IsOptional, IsString, IsNotEmpty } from 'class-validator';


export class CreateRemarkDto {
    @IsNumber()
    @IsOptional()
    studentId?: number;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    content!: string;

    @IsString()
    @IsOptional()
    category?: string;
}
