import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Put } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';

@Controller('students')
export class RemarksController {
  constructor(private readonly remarksService: RemarksService) {}

  @Get('/remarks')
  getAllStudentsRemarks() {
    return this.remarksService.getAllStudentsRemarks();
  }

  @Get(':id/remarks')
  getOneStudentRemarks(@Param('id', ParseIntPipe) id: number) {
    return this.remarksService.findOneStudentRemarks(id);
  }
  @Get(':id/remarks/:remarkId')
  getOneStudentRemarksId(@Param('id', ParseIntPipe) studentId: number, @Param('remarkId', ParseIntPipe) remarkId: number) {
    return this.remarksService.findOneStudentRemarksId(studentId, remarkId);
  }

  @Post(':id/remarks')
  createStudentRemark(
    @Param('id', ParseIntPipe) studentId: number,
    @Body() createRemarkDto: CreateRemarkDto,
  ) {
    const { studentId: bodyStudentId, ...rest } = createRemarkDto;

    return this.remarksService.createRemark({
      ...rest,
      studentId: bodyStudentId ?? studentId,
    });
  }

  @Post(':id/remarks/:remarkId')
  createStudentRemarkWithId(
    @Param('id', ParseIntPipe) studentId: number,
    @Body() createRemarkDto: CreateRemarkDto,
  ) {
    return this.remarksService.createStudentRemarkWithId(studentId, createRemarkDto);
  }


  @Patch('remarks/:id')
  updateStudentRemark(@Param('id', ParseIntPipe) id: number, @Body() updateRemarkDto: UpdateRemarkDto) {
    return this.remarksService.updateStudentRemark(id,updateRemarkDto);
  }

  @Patch(':id/remarks/:remarkId')
  updateStudentAndRemark(
    @Param('id', ParseIntPipe) studentId: number,
    @Param('remarkId', ParseIntPipe) remarkId: number,
    @Body() updateRemarkDto: UpdateRemarkDto
  ) {
    return this.remarksService.updateStudentAndRemark(studentId, remarkId, updateRemarkDto);
  }

  @Put('remarks/:id')
  updateStudentRemarkPut(@Param('id', ParseIntPipe) id: number, @Body() updateRemarkDto: UpdateRemarkDto) {
    return this.remarksService.updateStudentRemarkPut(id,updateRemarkDto);
  }

  @Put(':id/remarks/:remarkId')
  updateStudentAndRemarkPut(
    @Param('id', ParseIntPipe) studentId: number,
    @Param('remarkId', ParseIntPipe) remarkId: number,
    @Body() updateRemarkDto: UpdateRemarkDto
  ) {
    return this.remarksService.updateStudentAndRemarkPut(studentId, remarkId, updateRemarkDto);
  }

  @Delete(':id/remarks')
  deleteStudentRemark(@Param('id', ParseIntPipe) id: number) {
    return this.remarksService.deleteRemarkStudent(id);
  }

  @Delete(':id/remarks/:remarkId')
  deleteStudentAndRemark(
    @Param('id', ParseIntPipe) studentId: number,
    @Param('remarkId', ParseIntPipe) remarkId: number
  ) {
    return this.remarksService.deleteStudentAndRemark(studentId, remarkId);
  }
}
