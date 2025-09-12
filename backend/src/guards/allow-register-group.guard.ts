import { CanActivate, HttpException, Injectable } from '@nestjs/common';
import { SemesterService } from 'src/services';

@Injectable()
export class AllowRegisterGroupGuard implements CanActivate {
  constructor(private readonly semesterService: SemesterService) {}

  async canActivate(): Promise<boolean> {
    const isAllowRegisterGroup =
      await this.semesterService.allowRegisterGroup();
    if (!isAllowRegisterGroup) {
      throw new HttpException('Hiện không mở đăng ký nhóm', 400);
    }
    return true;
  }
}
