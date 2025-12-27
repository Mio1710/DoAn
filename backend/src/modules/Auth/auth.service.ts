import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities';
import { StudentService } from '../Student/student.service';
import { UserService } from '../User/user.service';
import { Student } from '../common/entities/student.entity';

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
    const email = user.email;
    let payload = {};
    const teacher = await this.getTeacherProfile(email);
    if (!teacher) {
      throw new UnauthorizedException('No teacher associated with this email');
    }

    payload = {
      sub: teacher.maso,
      id: teacher.id,
      roles: teacher.roles,
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
