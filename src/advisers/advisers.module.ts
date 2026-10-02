import { Module } from '@nestjs/common';
import { AdvisersService } from './advisers.service';
import { AdvisersController } from './advisers.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { AdvisersGlobalController } from './advisers-global.controller';
@Module({
  imports: [PrismaModule],
  controllers: [AdvisersController, AdvisersGlobalController],
  providers: [AdvisersService, PrismaService],
})
export class AdvisersModule {}
