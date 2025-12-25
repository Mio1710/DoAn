import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester, Student, StudentSubject, User } from 'src/entities';
import { StudentService } from 'src/services';
import { SemesterService } from '../Semester/semester.service';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Student, Semester, StudentSubject]),
  ],
  controllers: [],
  providers: [UserService, UserRepository, StudentService, SemesterService],
  exports: [UserService],
})
export class UserModule {}
