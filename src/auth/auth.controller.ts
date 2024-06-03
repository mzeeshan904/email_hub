// src/auth/auth.controller.ts
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Get('outlook')
  @UseGuards(AuthGuard('outlook'))
  async outlookLogin() {
    // Initiates the OAuth2 login flow
  }

  @Get('outlook/redirect')
  @UseGuards(AuthGuard('outlook'))
  async outlookRedirect(@Req() req) {
    const user = req.user;
    await this.userService.createUser(user);

    return {
      message: 'User information saved successfully',
      user,
    };
  }
}
