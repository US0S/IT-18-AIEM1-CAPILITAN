import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { StudentsGlobalController } from './students-global.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [StudentsController, StudentsGlobalController],
  providers: [StudentsService, PrismaService],
})
export class StudentsModule {}
