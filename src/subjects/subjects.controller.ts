import { Controller, Get, Post, Body, Patch, Param, Put, Delete, ParseIntPipe } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Controller('programs')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
    
  @Get('/subjects')
  getAllSubjectPrograms() {
     return this.subjectsService.getAllSubjectPrograms();
   }
 
   @Get(':id/subjects')
   getOneSubjectPrograms(@Param('id', ParseIntPipe) id: number) {
     return this.subjectsService.findOneSubjectPrograms(id);
   }
   @Get(':id/subjects/:subjectId')
   findOneSubjectProgramsId(@Param('id', ParseIntPipe) programId: number, @Param('subjectId', ParseIntPipe) subjectId: number) {
     return this.subjectsService.findOneSubjectProgramsId(programId, subjectId);
   }
 
   @Post(':id/subjects')
   createSubjectProgram(
     @Param('id', ParseIntPipe) programId: number,
     @Body() createSubjectDto: CreateSubjectDto,
   ) {
     const { programId: bodyProgramId, ...rest } = createSubjectDto;
 
     return this.subjectsService.createSubjectProgram({
       ...rest,
       programId: bodyProgramId ?? programId,
     });
   }
 
   @Post(':id/subjects/:subjectId')
   createSubjectProgramWithId(
     @Param('id', ParseIntPipe) programId: number,
     @Body() createSubjectDto: CreateSubjectDto,
   ) {
     return this.subjectsService.createSubjectProgramWithId(programId, createSubjectDto);
   }
 
   @Patch('subjects/:id')
   updateSubjectProgram(@Param('id', ParseIntPipe) id: number, @Body() updateSubjectDto: UpdateSubjectDto) {
     return this.subjectsService.updateSubjectProgram(id,updateSubjectDto);
   }
 
   @Patch(':id/subjects/:subjectId')
   updateSubjectAndProgram(
     @Param('id', ParseIntPipe) programId: number,
     @Param('subjectId', ParseIntPipe) subjectId: number,
     @Body() updateSubjectDto: UpdateSubjectDto
   ) {
     return this.subjectsService.updateSubjectAndProgram(subjectId, programId, updateSubjectDto);
   }
 
   @Put('subjects/:id')
   updateSubjectProgramPut(@Param('id', ParseIntPipe) id: number, @Body() updateSubjectDto: UpdateSubjectDto) {
     return this.subjectsService.updateSubjectProgramPut(id, updateSubjectDto);
   }
 
   @Put(':id/subjects/:subjectId')
   updateSubjectAndProgramPut(
     @Param('id', ParseIntPipe) programId: number,
     @Param('subjectId', ParseIntPipe) subjectId: number,
     @Body() updateSubjectDto: UpdateSubjectDto
   ) {
     return this.subjectsService.updateSubjectAndProgramPut(subjectId, programId, updateSubjectDto);
   }
 
   @Delete(':id/subjects')
   deleteSubjectProgram(@Param('id', ParseIntPipe) id: number) {
     return this.subjectsService.deleteSubjectProgram(id);
   }
 
   @Delete(':id/subjects/:subjectId')
   deleteSubjectAndProgram(
     @Param('id', ParseIntPipe) programId: number,
     @Param('subjectId', ParseIntPipe) subjectId: number
   ) {
     return this.subjectsService.deleteSubjectAndProgram(subjectId, programId);
   }
}
