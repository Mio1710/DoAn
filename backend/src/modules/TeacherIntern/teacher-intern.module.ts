import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternSemester } from 'src/entities';
import { ResponseUtils } from 'src/utils';
import { StudentInternModule } from '../StudentIntern/student-intern.module';
import { UserModule } from '../User/user.module';
import { TeacherInternController } from './teacher-intern.controller';
import { TeacherInternService } from './teacher-intern.service';

@Module({
  imports: [
    UserModule,
    StudentInternModule,
    TypeOrmModule.forFeature([InternSemester]),
  ],
  controllers: [TeacherInternController],
  providers: [TeacherInternService, ResponseUtils],
  exports: [],
})
export class TeacherInternModule {}
