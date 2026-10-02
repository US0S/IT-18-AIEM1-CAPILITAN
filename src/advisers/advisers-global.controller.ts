import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { AdvisersService } from './advisers.service';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

@Controller('advisers')
export class AdvisersGlobalController {
  constructor(private readonly advisersService: AdvisersService) {}

  @Post()
  createAdviser(@Body() createAdviserDto: CreateAdviserDto) {
    return this.advisersService.createAdviser(createAdviserDto);
  }

  @Get()
  findAllAdvisers() {
    return this.advisersService.findAllAdvisers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advisersService.findOneAdviser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.advisersService.updateAdviser(+id, updateAdviserDto);
  }

  @Put(':id')
  updatePut(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.advisersService.updateAdviser(+id, updateAdviserDto);
  }

  @Delete(':id')
  removeAdviser(@Param('id') id: string) {
    return this.advisersService.removeAdviser(+id);
  }
}
