import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('programs')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Get('/students')
  getAllStudentPrograms() {
    return this.studentsService.getAllStudentPrograms();
  }

  @Get(':id/students')
  getOneStudentPrograms(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOneStudentPrograms(id);
  }
  @Get(':id/students/:studentId')
  findOneStudentProgramsId(@Param('id', ParseIntPipe) programId: number, @Param('studentId', ParseIntPipe) studentId: number) {
    return this.studentsService.findOneStudentProgramsId(programId, studentId);
  }

  @Post(':id/students')
  createStudentProgram(
    @Param('id', ParseIntPipe) programId: number,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    const { programId: bodyProgramId, ...rest } = createStudentDto;

    return this.studentsService.createStudentProgram({
      ...rest,
      programId: bodyProgramId ?? programId,
    });
  }

  @Post(':id/students/:studentId')
  createStudentProgramWithId(
    @Param('id', ParseIntPipe) programId: number,
    @Body() createStudentDto: CreateStudentDto,
  ) {
    return this.studentsService.createStudentProgramWithId(programId, createStudentDto);
  }

  @Patch('students/:id')
  updateStudentProgram(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.updateStudentProgram(id,updateStudentDto);
  }

  @Patch(':id/students/:studentId')
  updateStudentAndProgram(
    @Param('id', ParseIntPipe) programId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.updateStudentAndProgram(studentId, programId, updateStudentDto);
  }

  @Put('students/:id')
  updateStudentProgramPut(@Param('id', ParseIntPipe) id: number, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentsService.updateStudentProgramPut(id, updateStudentDto);
  }

  @Put(':id/students/:studentId')
  updateStudentAndProgramPut(
    @Param('id', ParseIntPipe) programId: number,
    @Param('studentId', ParseIntPipe) studentId: number,
    @Body() updateStudentDto: UpdateStudentDto
  ) {
    return this.studentsService.updateStudentAndProgramPut(studentId, programId, updateStudentDto);
  }

  @Delete(':id/students')
  deleteStudentProgram(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.deleteStudentProgram(id);
  }

  @Delete(':id/students/:studentId')
  deleteStudentAndProgram(
    @Param('id', ParseIntPipe) programId: number,
    @Param('studentId', ParseIntPipe) studentId: number
  ) {
    return this.studentsService.deleteStudentAndProgram(studentId, programId);
  }
}
