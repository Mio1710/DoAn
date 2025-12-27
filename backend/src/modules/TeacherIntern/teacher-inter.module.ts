import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Intern, InternSemester, Semester } from 'src/entities';
import { ResponseUtils } from 'src/utils';
import { UserModule } from '../User/user.module';
import { TeacherInternController } from './teacher-intern.controller';
import { TeacherInternService } from './teacher-intern.service';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([Intern, Semester, InternSemester]),
  ],
  controllers: [TeacherInternController],
  providers: [TeacherInternService, ResponseUtils],
  exports: [],
})
export class TeacherInternModule {}
