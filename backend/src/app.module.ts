import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CommandRunnerModule } from 'nest-commander';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ListCommands from './commands';
import databaseConfig from './configs/database.config';
import { envSchema } from './configs/validation/env_variable';
import * as ListControllers from './controllers';
import * as ListEntities from './entities';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { AuthModule } from './modules/Auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { FacultyModule } from './modules/Faculty/faculty.module';
import { LO } from './modules/LO/entity/lo.entity';
import { LOModule } from './modules/LO/lo.module';
import { ReportModule } from './modules/Report/report.module';
import { ResultModule } from './modules/Result/result.module';
import { SemesterModule } from './modules/Semester/semester.module';
import { StudentModule } from './modules/Student/student.module';
import { StudentInternModule } from './modules/StudentIntern/student-intern.module';
import { StudentTopic } from './modules/StudentTopic/entities/student-topic.entity';
import { StudentTopicModule } from './modules/StudentTopic/student-topic.module';
import { TeacherInternModule } from './modules/TeacherIntern/teacher-intern.module';
import { Topic } from './modules/Topic/entities/topic.entity';
import { TopicController } from './modules/Topic/topic.controller';
import { TopicModule } from './modules/Topic/topic.module';
import { UserModule } from './modules/User/user.module';
import * as ListServices from './services';
import { BaseSubscriber } from './subscribers/base.subscribe';
import * as ListUtils from './utils';
config();

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: envSchema,
      isGlobal: true,
      cache: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forFeature([
      ...Object.values(ListEntities),
      Topic,
      StudentTopic,
      LO,
    ]),
    TypeOrmModule.forRootAsync(databaseConfig.asProvider()),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
    CommandRunnerModule,
    ClsModule.forRoot({
      global: true,
      middleware: {
        mount: true,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 3600000,
    }),
    CommonModule,
    AuthModule,
    UserModule,
    TopicModule,
    TeacherInternModule,
    StudentTopicModule,
    SemesterModule,
    FacultyModule,
    StudentModule,
    LOModule,
    ReportModule,
    ResultModule,
    StudentInternModule,
  ],
  controllers: [
    AppController,
    ...Object.values(ListControllers),
    TopicController,
  ],
  providers: [
    AppService,
    ...Object.values(ListServices),
    ...Object.values(ListCommands),
    ...Object.values(ListUtils),
    HttpExceptionFilter,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestInterceptor,
    },
    BaseSubscriber,
  ],
})
export class AppModule {}
