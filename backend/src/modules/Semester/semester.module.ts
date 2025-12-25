import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Semester } from 'src/entities';
import { ResponseUtils } from 'src/utils';
import { AuthModule } from '../Auth/auth.module';
import { SemesterController } from './semester.controller';
import { SemesterService } from './semester.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Semester])],
  controllers: [SemesterController],
  providers: [SemesterService, ResponseUtils],
  exports: [],
})
export class SemesterModule {}
