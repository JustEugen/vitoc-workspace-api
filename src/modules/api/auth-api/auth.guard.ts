import { UserRepository } from './../../entities/user-entity/user.repository';
import { verify } from 'jsonwebtoken';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { USER_REPOSITORY } from 'src/modules/entities/user-entity';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = request.headers.authorization.slice('Bearer '.length);

    let decoded;

    try {
      decoded = verify(token, process.env.JWT_ACCESS_SECRET);
    } catch (err) {
      throw new UnauthorizedException('You are not authorized');
    }

    const user = await this.userRepository.getOneById(decoded.id);

    (request as any).user = user;

    return true;
  }
}
