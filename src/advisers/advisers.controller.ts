import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdvisersService } from './advisers.service';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

@Controller('programs')
export class AdvisersController {
  constructor(private readonly advisersService: AdvisersService) {}

  @Get('/advisers')
  getAllAdviserPrograms() {
    return this.advisersService.getAllAdviserPrograms();
  }

  @Get(':id/advisers')
  getOneAdviserPrograms(@Param('id') id: string) {
    return this.advisersService.findOneAdviserPrograms(+id);
  }

  @Get(':id/advisers/:adviserId')
  findOneAdviserProgramsId(@Param('id') programId: string, @Param('adviserId') adviserId: string) {
    return this.advisersService.findOneAdviserProgramsId(+programId, +adviserId);
  }

  @Post(':id/advisers')
  createAdviserProgram(
    @Param('id') programId: string,
    @Body() createAdviserDto: CreateAdviserDto,
  ) {
    const { programId: bodyProgramId, ...rest } = createAdviserDto;
    return this.advisersService.createAdviserProgram(+programId, {
      ...rest,
      programId: bodyProgramId ?? +programId,
    });
  }

  @Post(':id/advisers/:adviserId')
  createAdviserProgramWithId(
    @Param('id') programId: string,
    @Param('adviserId') adviserId: string,
    @Body() createAdviserDto: CreateAdviserDto,
  ) {
    return this.advisersService.createAdviserProgramWithId(+programId, createAdviserDto);
  }

  @Patch('advisers/:id')
  updateAdviserProgram(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.advisersService.updateAdviserProgram(+id, updateAdviserDto);
  }

  @Patch(':id/advisers/:adviserId')
  updateAdviserAndProgram(
    @Param('id') programId: string,
    @Param('adviserId') adviserId: string,
    @Body() updateAdviserDto: UpdateAdviserDto
  ) {
    return this.advisersService.updateAdviserAndProgram(+adviserId, +programId, updateAdviserDto);
  }

  @Put('advisers/:id')
  updateAdviserProgramPut(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.advisersService.updateAdviserProgramPut(+id, updateAdviserDto);
  }

  @Put(':id/advisers/:adviserId')
  updateAdviserAndProgramPut(
    @Param('id') programId: string,
    @Param('adviserId') adviserId: string,
    @Body() updateAdviserDto: UpdateAdviserDto
  ) {
    return this.advisersService.updateAdviserAndProgramPut(+adviserId, +programId, updateAdviserDto);
  }

  @Delete('advisers/:id')
  deleteAdviserProgram(@Param('id') id: string) {
    return this.advisersService.deleteAdviserProgram(+id);
  }

  @Delete(':id/advisers/:adviserId')
  deleteAdviserAndProgram(@Param('id') programId: string, @Param('adviserId') adviserId: string) {
    return this.advisersService.deleteAdviserAndProgram(+adviserId, +programId);
  }

}
