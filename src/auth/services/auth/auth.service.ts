import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/services/user/user.service';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user';
import { TokenPayload } from 'src/auth/models/token-payload.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, passwd: string) {
    let user = await this.userService.findByEmail(email)
    if (!user)
      return null
    let authenticated = await bcrypt.compare(passwd, user.passwd!)
    if (!authenticated)
      return null
    return user
  }

  generateToken(user: User) {
    let payload: TokenPayload = {
      role: user.role!,
      sub: user.id!
    }
    return this.jwtService.sign(payload)
  }
}
