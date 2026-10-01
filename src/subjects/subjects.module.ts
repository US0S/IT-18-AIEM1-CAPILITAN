import { Module } from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsController } from './subjects.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { SubjectsGlobalController } from './subjects-global.controller';

@Module({
  imports: [PrismaModule],
  controllers: [SubjectsController, SubjectsGlobalController],
  providers: [SubjectsService, PrismaService],
})
export class SubjectsModule {}
