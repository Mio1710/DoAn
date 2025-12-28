import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { CreateStudentDto } from 'src/dtos';
import { ResponseUtils } from 'src/utils';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Get()
  async getListUsers(@Res() res, @Req() req) {
    const khoa_id = req.user.khoa_id;
    const options = { where: { khoa_id } };
    const data = await this.studentService.getLists(options);

    return this.responseUtils.success({ data }, res);
  }

  @Post()
  async createUser(@Body() student: CreateStudentDto, @Res() res, @Req() req) {
    student.khoa_id = req.user.khoa_id;
    const { matkhau, ...data } = await this.studentService.create(student);
    console.log('matkhau', matkhau);
    return this.responseUtils.success({ data }, res);
  }
}
