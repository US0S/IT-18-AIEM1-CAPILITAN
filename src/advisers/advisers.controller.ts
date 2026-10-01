import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdvisersService } from './advisers.service';
import { CreateAdviserDto } from './dto/create-adviser.dto';
import { UpdateAdviserDto } from './dto/update-adviser.dto';

@Controller('advisers')
export class AdvisersController {
  constructor(private readonly advisersService: AdvisersService) {}

  @Post()
  create(@Body() createAdviserDto: CreateAdviserDto) {
    return this.advisersService.create(createAdviserDto);
  }

  @Get()
  findAll() {
    return this.advisersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.advisersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdviserDto: UpdateAdviserDto) {
    return this.advisersService.update(+id, updateAdviserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.advisersService.remove(+id);
  }
}
