import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Req,
  Request,
  Res,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ChangePasswordDto,
  CreateUserDTO,
  SingInDto,
  UpdateProfileDto,
} from 'src/dtos';
import { User } from 'src/entities';
import { AuthGuard } from 'src/modules/Auth/guards/auth.guard';
import { UserService } from 'src/modules/User/user.service';
import { AuthService } from 'src/services/auth.service';
import { ResponseUtils } from 'src/utils';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authServeice: AuthService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Post('login')
  async login(@Body() body: SingInDto): Promise<any> {
    const data = await this.authServeice.signIn(
      body.maso,
      body.matkhau,
      body.type,
    );
    console.log('data login: ', data);
    return data;
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return this.authServeice.getProfile(req.user);
  }

  @Get('init-admin')
  async initAdmin(): Promise<User> {
    // check nếu có admin thì return null

    const admin: CreateUserDTO = {
      maso: 'admin',
      hodem: 'admin',
      ten: 'admin',
      email: 'admin@iuh.com',
      phone: '0123456789',
      roles: ['super_admin'],
      matkhau: '123123123',
    };

    return this.userService.create(admin);
  }

  @UseGuards(AuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() body: ChangePasswordDto,
    @Req() req,
  ): Promise<any> {
    const user = req.user;
    return await this.authServeice.changePassword(user, body);
  }

  @Post('logout')
  logout() {
    return this.authServeice.logout();
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(@Body() body: UpdateProfileDto, @Res() res, @Req() req) {
    const user = req.user;
    const data = await this.authServeice.updateProfile(user, body);
    return this.responseUtils.success({ data }, res);
  }
}
