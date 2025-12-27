import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester, StudentSubject } from 'src/entities';
import { StudentModule } from '../Student/student.module';
import { User } from '../common/entities/user.entity';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    StudentModule,
    TypeOrmModule.forFeature([User, Semester, StudentSubject]),
  ],
  controllers: [],
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
