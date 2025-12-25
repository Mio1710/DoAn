import { CanActivate, HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class AllowRegisterTopicGuard implements CanActivate {
  // constructor(private readonly semesterService: SemesterService) {}

  async canActivate(): Promise<boolean> {
    const isAllowRegisterTopic = true;
    // await this.semesterService.allowRegisterTopic();
    if (!isAllowRegisterTopic) {
      throw new HttpException('Hiện không mở đăng ký đề tài', 400);
    }
    return true;
  }
}
