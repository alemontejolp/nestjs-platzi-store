import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth/auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    private authService: AuthService
  ) {
    super({
      usernameField: 'email',
      passwordField: 'passwd',
    })
  }

  async validate(email: string, passwd: string) {
    let user = await this.authService.validateUser(email, passwd)
    if (!user)
      throw new ForbiddenException('Not allowed to use this process')
    return user
  }
}
