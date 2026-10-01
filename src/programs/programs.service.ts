import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProgramDto: CreateProgramDto) {
    return this.prisma.program.create({
      data: { name: createProgramDto.name },
    });
  }

  findAll() {
    return this.prisma.program.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} was not found`);
    }

    return program;
  }

  async update(id: number, updateProgramDto: UpdateProgramDto) {
    await this.findOne(id);

    return this.prisma.program.update({
      where: { id },
      data: updateProgramDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.program.delete({
      where: { id },
    });
  }
}
