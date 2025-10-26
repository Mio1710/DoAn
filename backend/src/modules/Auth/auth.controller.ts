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
import { Response } from 'express';
import {
  ChangePasswordDto,
  CreateUserDTO,
  SingInDto,
  UpdateProfileDto,
} from 'src/dtos';
import { User } from 'src/entities';
import { AuthGuard } from 'src/guards/auth.guard';
import { GoogleOauthGuard } from 'src/guards/google-oauth.guard';
import { ResponseUtils } from 'src/utils';
import { UserService } from '../User/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UsePipes(ValidationPipe)
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
    private readonly responseUtils: ResponseUtils,
  ) {}

  @Post('login')
  async login(@Body() body: SingInDto): Promise<any> {
    const data = await this.authService.signIn(
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
    return this.authService.getProfile(req.user);
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
    return await this.authService.changePassword(user, body);
  }

  @Post('logout')
  logout() {
    return this.authService.logout();
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async updateProfile(@Body() body: UpdateProfileDto, @Res() res, @Req() req) {
    const user = req.user;
    const data = await this.authService.updateProfile(user, body);
    return this.responseUtils.success({ data }, res);
  }

  @Get('google')
  @UseGuards(GoogleOauthGuard)
  async googleAuth() {
    // initiates the Google OAuth2 login flow
  }

  @Get('google/callback')
  @UseGuards(GoogleOauthGuard)
  async googleAuthCallback(@Req() req, @Res() res: Response) {
    try {
      const frontend_url = process.env.FRONTEND_URL;
      const token = await this.authService.signInWithGoogle(req.user);
      res
        .cookie('auth.token', token, {
          secure: true,
        })
        .redirect(frontend_url);
    } catch (error) {
      console.log('Error during Google auth callback: ', error);

      res.redirect(`http://localhost:4000/login?error=${error.message}`);
    }
  }
}
