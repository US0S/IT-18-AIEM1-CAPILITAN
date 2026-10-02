import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../generated/prisma/client';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  
  createStudents(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: createStudentDto as Prisma.StudentUncheckedCreateInput,
    });
  }

  findAllStudents() {
    return this.prisma.student.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOneStudent(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: Number(id) },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }

    return student;
  }

  async updateStudent(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.prisma.student.findUnique({ where: { id: Number(id) } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return this.prisma.student.update({
      where: { id: Number(id) },
      data: updateStudentDto as Prisma.StudentUncheckedUpdateInput,
    });
  }

  async deleteStudent(id: number) {
    const student = await this.prisma.student.findUnique({ where: { id: Number(id) } });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    const deletedStudent = await this.prisma.student.delete({ where: { id: Number(id) } });
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${id} was not found`);
    }
    return {
      success: true,
      message: `Student with ID ${id} has been deleted`,
      data: deletedStudent,
    };
  }
//////////////////////////////////  stucentId

 private async searchProgramExists(programId: number) {
    const program = await this.prisma.student.findUnique({
      where: { id: Number(programId) },
    });

    if (!program) {
      throw new NotFoundException(`Program with ID ${programId} was not found`);
    }

    return program;
  }
  /////////////////////////////
  async createStudentProgram(createStudentDto: CreateStudentDto,)
  : Promise<{ id: number; name: string; programId: number; }> {
    if (createStudentDto.programId == null) {
      throw new Error('programId is required');
    }

    await this.searchProgramExists(createStudentDto.programId);
    return this.createStudents(createStudentDto);
  }

  async createStudentProgramWithId(programId: number, createStudentDto: CreateStudentDto) {
    await this.searchProgramExists(programId);
    const { programId: bodyProgramId, ...rest } = createStudentDto;
    return this.createStudents({
      ...rest,
      programId: bodyProgramId ?? programId,
    });
  }

  getAllStudentPrograms() {
    return this.prisma.student.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOneStudentPrograms(programId: number) {
    await this.searchProgramExists(programId);

    return this.prisma.student.findMany({
      where: { id: Number(programId) },
      orderBy: { id: 'desc' },
    });
  }
  
  async findOneStudentProgramsId(programId: number, studentId: number) {
    await this.searchProgramExists(programId);
    return this.prisma.student.findMany({
      where: { id: Number(studentId), programId: Number(programId) },
      orderBy: { id: 'desc' },
    });
  }  

    // /programId/students/:studentsId
  async updateStudentProgram(
    programId: number,
    updateRemarkDto: UpdateStudentDto
  ) {
    await this.searchProgramExists(programId);
    const program = await this.prisma.student.findFirst({
      where: { id: Number(programId) },
    });
    if (!program) {
      throw new NotFoundException(
        `Student with ID ${programId} was not found`,
      );
    }
    return this.prisma.student.update({
      where: { 
        id: Number(programId),
      },
      data: updateRemarkDto,
    });
  }
    //studentId and programId
  async updateStudentAndProgram(
  studentId: number, 
  programId: number, 
  updateRemarkDto: UpdateStudentDto
) {
  await this.searchProgramExists(programId);

    const program = await this.prisma.student.findFirst({
      where: { id: Number(programId), studentId: Number(studentId) },
    });
    if (!program) {
      throw new NotFoundException(
        `Student with ID ${programId} was not found for student with ID ${studentId}`,
      );
    }

  return this.prisma.student.update({
    where: { 
      id: Number(programId),
      studentId: Number(studentId),
    },
    data: UpdateStudentDto,
  });
}

  // /students/remarks/:remarkId
  async updateStudentProgramPut(programId: number, updateRemarkDto: UpdateStudentDto) {
    await this.searchProgramExists(programId);

    const program = await this.prisma.student.findFirst({
      where: { id: Number(programId) },
    });
    if (!program) {
      throw new NotFoundException(
        `Program with ID ${programId} was not found`,
      );
    }

    return this.prisma.student.updateMany({
      where: { id: Number(programId) },
      data: updateRemarkDto,
    });
  }

  //studentId and remarkId
  async updateStudentAndProgramPut(
    studentId: number,
    programId: number,
    updateRemarkDto: UpdateStudentDto,
  ) {
    await this.searchProgramExists(programId);

    const program = await this.prisma.student.findFirst({
      where: { id: Number(programId), studentId: Number(studentId) },
    });
    if (!program) {
      throw new NotFoundException(
        `Program with ID ${programId} was not found for student with ID ${studentId}`,
      );
    }

    return this.prisma.student.updateMany({
      where: {
        id: Number(programId),
        studentId: Number(studentId),
      },
      data: updateRemarkDto,
    });
  }
   
  async deleteStudentProgram(programId: number) {
    await this.searchProgramExists(programId);
    const deletedStudent = await this.prisma.student.delete({
      where: { id: Number(programId) },
    });
    if (!deletedStudent) {
      throw new NotFoundException(`Student with ID ${programId} was not found`);
    }

    return {
      success: true,
      message: `Student with ID ${programId} has been deleted`,
      data: deletedStudent,
    };  
  }  

  async deleteStudentAndProgram(studentId: number, programId: number) {
    await this.searchProgramExists(programId);
    const deletedStudent = await this.prisma.student.deleteMany({
      where: { id: Number(programId), studentId: Number(studentId) },
      
    });
    if (!deletedStudent) {
      throw new NotFoundException(
        `Student with ID ${studentId} was not found for program with ID ${programId}`,
      );
    }

    return {
      success: true,
      message: `Student with ID ${studentId} has been deleted for program with ID ${programId}`,
      data: deletedStudent,
    };
  }
}
