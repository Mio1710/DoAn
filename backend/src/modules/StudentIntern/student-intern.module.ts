import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternSemester } from 'src/entities';
import { CommonModule } from '../common/common.module';
import { StudentModule } from './../Student/student.module';
import { Intern } from './entity/intern.entity';
import { StudentIntern } from './entity/student-intern.entity';
import { InternController } from './intern.controller';
import { InternService } from './intern.service';
import { StudentInternController } from './student-intern.controller';
import { StudentInternService } from './student-intern.service';

@Module({
  imports: [
    CommonModule,
    StudentModule,
    TypeOrmModule.forFeature([Intern, StudentIntern, InternSemester]),
  ],
  controllers: [StudentInternController, InternController],
  providers: [StudentInternService, InternService],
  exports: [TypeOrmModule, StudentInternService],
})
export class StudentInternModule {}
