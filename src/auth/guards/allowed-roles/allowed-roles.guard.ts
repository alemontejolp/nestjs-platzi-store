import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ALLOWED_ROLRES_DECOR_KEY } from 'src/auth/decorators/allowed-roles.decorator';
import { Role } from 'src/auth/models/roles.model';
import { Request } from 'express';
import { TokenPayload } from 'src/auth/models/token-payload.model';

@Injectable()
export class AllowedRolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Extracting the list of allowed roles.
    let allowedRoles = this.reflector
      .get<Role[]|undefined>(
        ALLOWED_ROLRES_DECOR_KEY,
        context.getHandler())
    // If no list provided, no verification needed.
    console.log(allowedRoles)
    if (!(allowedRoles instanceof Array))
      return true
    // A list was provided. Extract the user from
    // the request
    let user = context.switchToHttp()
      .getRequest<Request>()
      .user as TokenPayload|undefined
    // If there is no user object, no authetization
    // was provided. Therefore, reject the request.
    console.log(user)
    if (!user)
      return false
    // Verify if the user has one of the allowed roles.
    return allowedRoles.includes(user.role as Role)
  }
}
