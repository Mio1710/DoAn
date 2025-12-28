import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentSubject } from 'src/entities';
import { FacultyModule } from '../Faculty/faculty.module';
import { StudentModule } from '../Student/student.module';
import { User } from '../common/entities/user.entity';
import { StudentTeacherController } from './student-teacher.controller';
import { SuperAdminController } from './super-admin.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    StudentModule,
    FacultyModule,
    TypeOrmModule.forFeature([User, StudentSubject]),
  ],
  controllers: [StudentTeacherController, SuperAdminController],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
