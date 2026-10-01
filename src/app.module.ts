import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/students.module';
import { RemarksModule } from './remarks/remarks.module';
import { ProgramsModule } from './programs/programs.module';
import { SubjectsModule } from './subjects/subjects.module';
import { AdvisersModule } from './advisers/advisers.module';

@Module({
  imports: [RemarksModule, StudentsModule, SubjectsModule, ProgramsModule, AdvisersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
