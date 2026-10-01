import { Injectable } from '@nestjs/common';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

@Injectable()
export class AdvisersService {
  create(createAdviserDto: CreateAdviserDto) {
    return 'This action adds a new adviser';
  }

  findAll() {
    return `This action returns all advisers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} adviser`;
  }

  update(id: number, updateAdviserDto: UpdateAdviserDto) {
    return `This action updates a #${id} adviser`;
  }

  remove(id: number) {
    return `This action removes a #${id} adviser`;
  }
}
