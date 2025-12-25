import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intern, InternSemester, Semester } from 'src/entities';
import { ResponseUtils } from 'src/utils';
import { SemesterService } from '../Semester/semester.service';
import { UserModule } from '../User/user.module';
import { TeacherInternController } from './teacher-intern.controller';
import { TeacherInternService } from './teacher-intern.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Intern, Semester, InternSemester]),
  ],
  controllers: [TeacherInternController],
  providers: [TeacherInternService, ResponseUtils, SemesterService],
  exports: [],
})
export class TeacherInternModule {}
