import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Inject,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Observable } from 'rxjs';
import { Request } from 'express';

import Config from '../../config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    @Inject(Config.KEY) private readonly config: ConfigType<typeof Config>,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKey = request.headers['api_access_key'];
    const isAuth = !(!apiKey || apiKey !== this.config.apiKey);
    if (!isAuth) {
      throw new UnauthorizedException('Not authorized');
    }
    return isAuth;
  }
}
