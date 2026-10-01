import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateSubjectDto {
  
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  programId!: number;
}
