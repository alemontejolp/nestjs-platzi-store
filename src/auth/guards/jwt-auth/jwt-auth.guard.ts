import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_ENDPOINT_DECOR_KEY } from 'src/auth/decorators/public-endpoint.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super()
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let isPublic = this.reflector.get(IS_PUBLIC_ENDPOINT_DECOR_KEY, context.getHandler())
    if (isPublic)
      return true
    return super.canActivate(context);
  }
}
