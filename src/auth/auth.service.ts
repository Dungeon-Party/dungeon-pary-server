import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../users/user.service'
import { JwtService } from '@nestjs/jwt'
import { compareSync } from 'bcryptjs'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<Partial<User> | null> {
    const user = await this.userService.findOne({
      OR: [{ email: username }, { username: username }],
    })
    if (!user || !compareSync(pass, user.password)) {
      throw new UnauthorizedException()
    }
    delete user.password
    return user
  }

  async generateJwt(user: User) {
    const payload = {
      sub: user.id,
      iss: 'dungeon-party',
      username: user.username,
      email: user.email,
    }
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  async validateApiKey(key: string): Promise<Partial<User>> {
    return this.userService.findApiKey(key)
  }
}
