import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SubjectsService {
  constructor(private readonly prisma: PrismaService) {}

  private async findProgram(programId: number) {
    const program = await this.prisma.program.findUnique({
      where: { id: programId },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} was not found`);
    }
  }

  async create(createSubjectDto: CreateSubjectDto) {
    await this.findProgram(createSubjectDto.programId);

    return this.prisma.subject.create({
      data: {
        description: createSubjectDto.description ?? '',
        Program: { connect: { id: createSubjectDto.programId } },
      },
      include: { Program: true },
    });
  }

  findAll() {
    return this.prisma.subject.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id },
      include: { Program: true },
    });

    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} was not found`);
    }

    return subject;
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);

    const { programId, ...data } = updateSubjectDto;
    if (programId !== undefined) {
      await this.findProgram(programId);
    }

    return this.prisma.subject.update({
      where: { id },
      data: {
        ...data,
        ...(programId !== undefined && {
          Program: { connect: { id: programId } },
        }),
      },
      include: { Program: true },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    const deletedSubject = await this.prisma.subject.delete({
      where: { id },
    });
    if (!deletedSubject) {
      throw new NotFoundException(`Subject with ID ${id} was not found`);
    }
    return {
      success: true,
      message: `Subject with ID ${id} has been deleted`,
      data: deletedSubject,
    };
  }
  /////////////////////////////


  getAllSubjectPrograms() {
    return this.prisma.subject.findMany({
      include: { Program: true },
      orderBy: { id: 'desc' },
    });
  }

  async createSubjectProgram(createSubjectDto: CreateSubjectDto,)
    : Promise<{ id: number; description: string; programId: number; }> {
      if (createSubjectDto.programId == null) {
        throw new Error('programId is required');
      }
  
      await this.findProgram(createSubjectDto.programId);
      return this.create(createSubjectDto);
    }
    
  async createSubjectProgramWithId(programId: number, createSubjectDto: CreateSubjectDto) {
    await this.findProgram(programId);
    const { programId: bodyProgramId, ...rest } = createSubjectDto;
    return this.create({
      ...rest,
      programId: bodyProgramId ?? programId,
    });
  }
  
  async findOneSubjectPrograms(programId: number) {
    await this.findProgram(programId);
    return this.prisma.subject.findMany({
      where: { programId },
      include: { Program: true },
      orderBy: { id: 'desc' },
    });
  }

  async findOneSubjectProgramsId(programId: number, subjectId: number) {
    await this.findProgram(programId);
    const subject = await this.prisma.subject.findFirst({
      where: { id: subjectId, programId },
      include: { Program: true },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} was not found for program with ID ${programId}`);
    }
    return subject;
  }

  async updateSubjectProgram(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);
    return this.update(id, updateSubjectDto);
  }

  async updateSubjectAndProgram(subjectId: number, programId: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findProgram(programId);
    const subject = await this.prisma.subject.findFirst({
      where: { id: subjectId, programId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} was not found for program with ID ${programId}`);
    }
    return this.update(subject.id, updateSubjectDto);
  }

  async updateSubjectProgramPut(id: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findOne(id);
    return this.update(id, updateSubjectDto);
  } 

  async updateSubjectAndProgramPut(subjectId: number, programId: number, updateSubjectDto: UpdateSubjectDto) {
    await this.findProgram(programId);
    const subject = await this.prisma.subject.findFirst({
      where: { id: subjectId, programId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} was not found for program with ID ${programId}`);
    }
    return this.update(subject.id, updateSubjectDto);
  }

  async deleteSubjectProgram(id: number) {
    await this.findOne(id);
    const subject = await this.prisma.subject.findUnique({
      where: { id },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${id} was not found`);
    }
    const deletedSubject = await this.prisma.subject.delete({
      where: { id },
    });
    if (!deletedSubject) {
      throw new NotFoundException(`Subject with ID ${id} was not found`);
    }
    return {
      success: true,
      message: `Subject with ID ${id} has been deleted`,
      data: deletedSubject,
    };
  }   

  async deleteSubjectAndProgram(subjectId: number, programId: number) { 
    await this.findProgram(programId);
    const subject = await this.prisma.subject.findFirst({
      where: { id: subjectId, programId },
    });
    if (!subject) {
      throw new NotFoundException(`Subject with ID ${subjectId} was not found for program with ID ${programId}`);
    }
    const deletedSubject = await this.prisma.subject.delete({
      where: { id: subject.id },
    });
    if (!deletedSubject) {
      throw new NotFoundException(`Subject with ID ${subjectId} was not found for program with ID ${programId}`);
    }
    return {
      success: true,
      message: `Subject with ID ${subjectId} has been deleted for program with ID ${programId}`,
      data: deletedSubject,
    };
  }  
}  
