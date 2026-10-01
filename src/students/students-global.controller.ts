import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Controller('students')
export class StudentsGlobalController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  createStudents(@Body() createStudentDto: CreateStudentDto) {
    return this.studentsService.createStudents(createStudentDto);
  }

  @Get()
  findAllStudents() {
    return this.studentsService.findAllStudents();
  }

  @Get(':id')
  findOneStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.findOneStudent(id);
  }

  @Patch(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentsService.updateStudent(id, updateStudentDto);
  }

  @Delete(':id')
  deletestudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentsService.deleteStudent(id);
  }
}
