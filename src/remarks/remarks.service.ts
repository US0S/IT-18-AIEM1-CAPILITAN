import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RemarksService {
  constructor(private readonly prisma: PrismaService) {}
   
  createRemark(createRemarkDto: CreateRemarkDto) {
    if (createRemarkDto.studentId == null) {
      throw new Error('studentId is required');
    }
    return this.prisma.remark.create({
      data: {
        studentId: createRemarkDto.studentId,
        content: createRemarkDto.content,
        ...(createRemarkDto.category !== undefined && {
          category: createRemarkDto.category,
        }),
      },
    });
  }
  
  findAllRemarks() {
    return this.prisma.remark.findMany();
  }

  async findOneRemark(id: number) {
    const remark = await this.prisma.remark.findUnique({
      where: { id },
      include: { Student: true },
    });

    if (!remark) {
      throw new NotFoundException(`Remark with ID ${id} was not found`);
    }

    return remark;
  }

  async updateRemark(id: number, updateRemarkDto: UpdateRemarkDto) {
    const remark = await this.prisma.remark.findUnique({ where: { id } });
    if (!remark) {
      throw new NotFoundException(`Remark with ID ${id} not found`);
    }

    return this.prisma.remark.update({
      where: { id },
      data: updateRemarkDto,
    });
  }

  async deleteRemark(id: number) {
    const remark = await this.prisma.remark.findUnique({ where: { id } });
    if (!remark) {
      throw new NotFoundException(`Remark with ID ${id} not found`);
    }
    const deletedRemark = await this.prisma.remark.delete({ where: { id } });
    if (!deletedRemark) {
      throw new NotFoundException(`Remark with ID ${id} was not found`);
    }
    return {
      success: true,
      message: `Remark with ID ${id} has been deleted`,
      data: deletedRemark,
    };
  }
//////////////////////////////////  stucentId

  getAllStudentsRemarks() {
    return this.prisma.remark.findMany({
      include: { Student: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async createStudentRemark(createRemarkDto: CreateRemarkDto) {
    if (createRemarkDto.studentId == null) {
      throw new Error('studentId is required');
    }

    await this.searchStudentExists(createRemarkDto.studentId);
    return this.createRemark(createRemarkDto);
  }

  async createStudentRemarkWithId(studentId: number, createRemarkDto: CreateRemarkDto) {
    await this.searchStudentExists(studentId);
    const { studentId: bodyStudentId, ...rest } = createRemarkDto;
    return this.createRemark({
      ...rest,
      studentId: bodyStudentId ?? studentId,
    });
  }
  /////////////////////////////
  private async searchStudentExists(studentId: number) {
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} was not found`);
    }

    return student;
  }
  ////////////////////////////////
  async findOneStudentRemarks(studentId: number) {
    await this.searchStudentExists(studentId);

    return this.prisma.remark.findMany({
      where: { studentId },
      include: { Student: true },
      orderBy: { createdAt: 'desc' },
    });
  }
  
  async findOneStudentRemarksId(studentId: number, remarkId: number) {
    await this.searchStudentExists(studentId);
    return this.prisma.remark.findMany({
      where: { id: remarkId, studentId },
      include: { Student: true },
      orderBy: { createdAt: 'desc' },
    });
  }  
    // /students/remarks/:remarkId
  async updateStudentRemark(
    remarkId: number,
    updateRemarkDto: UpdateRemarkDto
  ) {
    await this.searchStudentExists(remarkId);
    const remark = await this.prisma.remark.findFirst({
      where: { id: remarkId },
    });
    if (!remark) {
      throw new NotFoundException(
        `Remark with ID ${remarkId} was not found`,
      );
    }
    return this.prisma.remark.update({
      where: { 
        id: remarkId,
      },
      data: updateRemarkDto,
    });
  }
    //studentId and remarkId
  async updateStudentAndRemark(
  studentId: number, 
  remarkId: number, 
  updateRemarkDto: UpdateRemarkDto
) {
  await this.searchStudentExists(studentId);

    const remark = await this.prisma.remark.findFirst({
      where: { id: remarkId, studentId },
    });
    if (!remark) {
      throw new NotFoundException(
        `Remark with ID ${remarkId} was not found for student with ID ${studentId}`,
      );
    }

  return this.prisma.remark.update({
    where: { 
      id: remarkId,
      studentId, 
    },
    data: updateRemarkDto,
  });
}

  // /students/remarks/:remarkId
  async updateStudentRemarkPut(remarkId: number, updateRemarkDto: UpdateRemarkDto) {
    await this.searchStudentExists(remarkId);

    const remark = await this.prisma.remark.findFirst({
      where: { id: remarkId },
    });
    if (!remark) {
      throw new NotFoundException(
        `Remark with ID ${remarkId} was not found`,
      );
    }

    return this.prisma.remark.updateMany({
      where: { id: remarkId },
      data: updateRemarkDto,
    });
  }
  //studentId and remarkId
  async updateStudentAndRemarkPut(
    studentId: number,
    remarkId: number,
    updateRemarkDto: UpdateRemarkDto,
  ) {
    await this.searchStudentExists(studentId);

    const remark = await this.prisma.remark.findFirst({
      where: { id: remarkId, studentId },
    });
    if (!remark) {
      throw new NotFoundException(
        `Remark with ID ${remarkId} was not found for student with ID ${studentId}`,
      );
    }

    return this.prisma.remark.updateMany({
      where: {
        id: remarkId,
        studentId,
      },
      data: updateRemarkDto,
    });
  }
   
  async deleteRemarkStudent(id: number) {
    await this.searchStudentExists(id);
    const deletedRemark = await this.prisma.remark.delete({
      where: { id },
    });
    return {
      success: true,
      message: `Remark with ID ${id} has been deleted`,
      data: deletedRemark,
    };
  }

  async deleteStudentAndRemark(studentId: number, remarkId: number) {
    await this.searchStudentExists(studentId);
    const deletedRemark = await this.prisma.remark.deleteMany({
      where: { id: remarkId, studentId },
    });
    return {
      success: true,
      message: `Remark with ID ${remarkId} has been deleted for student with ID ${studentId}`,
      data: deletedRemark,
    };
  }
}
