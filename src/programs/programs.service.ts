import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProgramDto } from './dto/create-program.dto';
import { UpdateProgramDto } from './dto/update-program.dto';
import { PrismaService } from '../prisma/prisma.service';
import { not } from 'supertest/lib/cookies';

@Injectable()
export class ProgramsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createProgramDto: CreateProgramDto) {
    return this.prisma.program.create({
      data: { name: createProgramDto.name },
    });
  }

  /* findAll() {
    return this.prisma.program.findMany({
      orderBy: { id: 'desc' },
    });
  } */

  /* async findOne(id: number) {
    const program = await this.prisma.program.findUnique({
      where: { id },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} was not found`);
    }

    return program;
  } */
    
  async findAll() {
    const programs = this.prisma.program.findMany({
      select: {
        id: true,
        name: true,
        _count: {
          select: { Student: true },
        },
      },
      orderBy: { id: 'desc' },
    });
    return (await programs).map((program) => ({
      id: program.id,
      name: program.name,
      studentCount: program._count.Student,
    }));
  }
    
  async findOne(id: number) {
    const program = await this.prisma.program.findUnique({
      where: { id },  
      select: {
        id: true,
        name: true,
          Student: {
            select: { id: true, name: true },
          },
      },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${id} was not found`);
    }

    return ({
      id: program.id,
      name: program.name,
      studentCount: program.Student,
    });
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

    const deletedProgram = await this.prisma.program.delete({
      where: { id },
    });

    if (!deletedProgram) {
      throw new NotFoundException(`Program with ID ${id} was not found`);
    }

    return {
      success: true,
      message: `Program with ID ${id} has been deleted`,
      data: deletedProgram,
    };
  }
}
