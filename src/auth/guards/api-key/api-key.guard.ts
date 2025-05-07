import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { IS_PUBLIC_ENDPOINT_DECOR_KEY } from 'src/auth/decorators/public-endpoint.decorator';
import { Request } from 'express';
import config from 'src/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject(config.KEY) private configService: ConfigType<typeof config>
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    let isPublicEndpoint = this.reflector.get(IS_PUBLIC_ENDPOINT_DECOR_KEY, context.getHandler())
    if (isPublicEndpoint)
      return true
    let request = context.switchToHttp().getRequest<Request>()
    let authHeader = request.header('x-api-key')
    if (!authHeader)
      throw new UnauthorizedException('Missing api key')
    let incommingApiKey = authHeader
    if (incommingApiKey != this.configService.apiKey)
      throw new ForbiddenException('Client has no rights to use this resource')
    return true;
  }
}
