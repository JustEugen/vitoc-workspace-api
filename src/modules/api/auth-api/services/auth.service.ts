import { sign } from 'jsonwebtoken';
import { AUTH_ERRORS } from './../errors';
import { UserRepository } from './../../../entities/user-entity/user.repository';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/modules/entities/user-entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async createUser(email: string, password: string): Promise<void> {
    const existedUser = await this.userRepository.getOneByEmail(email);

    if (existedUser) {
      throw new BadRequestException({
        code: AUTH_ERRORS.USER_WITH_SUCH_EMAIL_EXIST,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await this.userRepository.createUser(email, hashPassword);
  }

  async login(email: string, password: string): Promise<string> {
    const existedUser = await this.userRepository.getOneByEmail(email);

    if (!existedUser) {
      throw new BadRequestException({
        code: AUTH_ERRORS.CREDENTIALS_IS_NOT_VALID,
      });
    }

    const comparePasswordsResult: boolean = await bcrypt.compare(
      password,
      existedUser.password,
    );

    if (!comparePasswordsResult) {
      throw new BadRequestException({
        code: AUTH_ERRORS.CREDENTIALS_IS_NOT_VALID,
      });
    }

    const accessToken: string = await sign(
      {
        id: existedUser.id,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: '30m',
      },
    );

    return accessToken;
  }
}
