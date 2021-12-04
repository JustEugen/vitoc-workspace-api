import { LoginDto } from './dtos/login.dto';
import { AuthService } from './../../api/auth-api/services/auth.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signup(@Body() body: SignUpDto): Promise<void> {
    await this.authService.createUser(body.email, body.password);
  }

  @Post('log-in')
  async login(@Body() body: LoginDto): Promise<string> {
    const { email, password } = body;

    return this.authService.login(email, password);
  }
}
