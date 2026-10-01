import { PartialType } from '@nestjs/mapped-types';
import { CreateRemarkDto } from './create-remark.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRemarkDto extends PartialType(CreateRemarkDto) {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    content: string;

    @IsString()
    @IsOptional()
    category?: string;
}
