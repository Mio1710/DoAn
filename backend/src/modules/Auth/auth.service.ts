import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Student, User } from 'src/entities';
import { StudentService } from 'src/services';
import { UserService } from '../User/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly studentService: StudentService,
    private jwtService: JwtService,
  ) {}
  async signIn(
    maso: string,
    pass: string,
    type?: string,
  ): Promise<{ access_token: string }> {
    let user;
    let typeUser = 'student';
    if (type) {
      user = await this.userService.findOne({ maso: maso });
      typeUser = user.roles;
    } else {
      user = await this.studentService.findOne({ maso: maso });
    }
    if (!user) {
      throw new UnauthorizedException();
    } else {
      const isMatch = await bcrypt.compare(pass, user.matkhau);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
    }

    const payload = {
      sub: user.maso,
      id: user.id,
      roles: typeUser,
      khoa_id: user.khoa_id ?? null,
    };
    console.log('payload before return', payload);

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async changePassword(user, data) {
    // get current user's password
    try {
      const userId = user.id;
      const roles = user.roles;
      if (roles.includes('student')) {
        return this.studentService.updatePassword(userId, data);
      } else {
        return this.userService.updatePassword(userId, data);
      }
    } catch (error) {
      throw new HttpException(error.message, error.code ?? 400);
    }
  }

  async logout() {
    return;
  }

  async getProfile(user) {
    try {
      if (user.roles == 'student') {
        const student = await this.studentService.findOne({ id: user.id });
        return { ...student, roles: ['student'] };
      } else {
        return await this.userService.findOne({ id: user.id });
      }
    } catch (error) {
      throw new HttpException(error.message, error.code ?? 400);
    }
  }

  async updateProfile(user, data) {
    try {
      const userId = user.id;
      const roles = user.roles;
      if (roles.includes('student')) {
        const student = await this.studentService.findOne({ id: userId });
        student.phone = data.phone;
        return this.studentService.update(student);
      } else {
        const user = await this.userService.findOne({ id: userId });
        user.phone = data.phone;
        return this.userService.update(userId, user);
      }
    } catch (error) {
      throw new HttpException(error.message, error.code ?? 400);
    }
  }

  // This function just apply for teacher
  async signInWithGoogle(user: any): Promise<string> {
    // Check if this email is teacher or student
    // If teacher, @teacher.edu.vn. For testing: xxx.work@gmail.com
    // If not found, create new teacher and continue
    const email = user.email;
    let payload = {};
    let teacher;
    try {
      teacher = await this.getTeacherProfile(email);
    } catch (error) {}
    if (!teacher) {
      //Option 1: throw Error
      throw new HttpException('You can not login by email', 404);

      // Option 2: create new ( Just apply for others case, such as: common user)
      // assum maso = xxx in email xxx.work@gmail.com
      const maso = email.split('@')[0];
      teacher = await this.userService.create({
        maso,
        email,
        hodem: user.familyName,
        ten: user.givenName,
        phone: null,
        roles: ['teacher'],
        matkhau: '123123123',
      });
    }

    payload = {
      sub: teacher.maso,
      id: teacher.id,
      roles: ['teacher'],
      khoa_id: teacher.khoa_id ?? null,
    };
    const token = await this.jwtService.signAsync(payload);

    return token;
  }

  async getTeacherProfile(email: string): Promise<User> {
    const user = await this.userService.findOne({ email: email });
    return user;
  }

  async getStudentProfile(email: string): Promise<Student> {
    const student = await this.studentService.findOne({ email: email });
    return student;
  }
}
