import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { CommandRunnerModule } from 'nest-commander';
import { ClsModule } from 'nestjs-cls';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ListCommands from './commands';
import DatabaseConfig from './configs/database.config';
import * as ListControllers from './controllers';
import * as ListEntities from './entities';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { AuthModule } from './modules/Auth/auth.module';
import { StudentTopic } from './modules/StudentTopic/entities/student-topic.entity';
import { StudentTopicModule } from './modules/StudentTopic/student-topic.module';
import { TeacherInternModule } from './modules/TeacherIntern/teacher-inter.module';
import { Topic } from './modules/Topic/entities/topic.entity';
import { TopicController } from './modules/Topic/topic.controller';
import { TopicModule } from './modules/Topic/topic.module';
import { UserModule } from './modules/User/user.module';
import * as ListRepositories from './repositories';
import * as ListServices from './services';
import { BaseSubscriber } from './subscribers/base.subscribe';
import * as ListUtils from './utils';
config();
console.log('env', process.env.DB_NAME, process.env.DB_HOST, DatabaseConfig);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [DatabaseConfig],
    }),
    TypeOrmModule.forFeature([
      ...Object.values(ListEntities),
      Topic,
      StudentTopic,
    ]),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
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
    AuthModule,
    UserModule,
    TopicModule,
    TeacherInternModule,
    StudentTopicModule,
  ],
  controllers: [
    AppController,
    ...Object.values(ListControllers),
    TopicController,
  ],
  providers: [
    AppService,
    ...Object.values(ListRepositories),
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
