import { Module } from '@nestjs/common';
import { AdvisersService } from './advisers.service';
import { AdvisersController } from './advisers.controller';

@Module({
  controllers: [AdvisersController],
  providers: [AdvisersService],
})
export class AdvisersModule {}
