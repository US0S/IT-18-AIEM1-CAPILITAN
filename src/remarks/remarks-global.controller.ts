import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { CreateRemarkDto } from './dto/create-remark.dto';
import { UpdateRemarkDto } from './dto/update-remark.dto';


@Controller('remarks')
export class RemarksGlobalController {
  constructor(private readonly remarksService: RemarksService) {}

  @Post()
  createRemark(@Body() createRemarkDto: CreateRemarkDto) {
    return this.remarksService.createRemark(createRemarkDto);
  }

  @Get()
  findAllRemarks() {
    return this.remarksService.findAllRemarks();
  }

  @Get(':id')
  findOneRemark(@Param('id') id: string) {
    return this.remarksService.findOneRemark(+id);
  }

  @Patch(':id')
  updateRemark(@Param('id') id: string, @Body() updateRemarkDto: UpdateRemarkDto) {
    return this.remarksService.updateRemark(+id, updateRemarkDto);
  }

  @Delete(':id')
  deleteRemark(@Param('id') id: string) {
    return this.remarksService.deleteRemark(+id);
  }
}
