import { CanActivate, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AllowStudentRegisterTopicGuard implements CanActivate {
  // constructor(private readonly semesterService: SemesterService) {}

  async canActivate(): Promise<boolean> {
    try {
      const isAllowRegisterTopic = true;
      // await this.semesterService.allowRegisterTopic();
      console.log('isAllowRegisterTopic', isAllowRegisterTopic);

      if (!isAllowRegisterTopic) {
        throw new HttpException('Hiện không thể đăng ký đề tài', 400);
      }
    } catch (error) {
      console.log('error AllowStudentRegisterTopicGuard', error);

      throw new HttpException('Hiện không thể đăng ký đề tài', 400);
    }
    return true;
  }
}
