import { PartialType } from '@nestjs/mapped-types';
import { CreateAdviserDto } from './create-adviser.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateAdviserDto extends PartialType(CreateAdviserDto) {
    @IsNumber()
    @IsNotEmpty()
    name: string;
}
