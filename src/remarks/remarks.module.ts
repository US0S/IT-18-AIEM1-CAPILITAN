import { Module } from '@nestjs/common';
import { RemarksService } from './remarks.service';
import { RemarksController } from './remarks.controller';
import { RemarksGlobalController } from './remarks-global.controller';  
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [PrismaModule],
  controllers: [RemarksController, RemarksGlobalController],
  providers: [RemarksService, PrismaService],
})
export class RemarksModule {}
