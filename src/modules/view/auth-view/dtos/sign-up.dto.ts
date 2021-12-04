import { IsEmail, Min } from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  password: string;
}
