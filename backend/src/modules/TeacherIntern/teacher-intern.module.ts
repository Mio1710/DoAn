import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternSemester } from '../StudentIntern/entity/intern-semester.entity';
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
  providers: [TeacherInternService, TeacherInternService],
  exports: [],
})
export class TeacherInternModule {}
