import { HeaderAPIKeyStrategy } from 'passport-headerapikey'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from '../auth.service'

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'api-key',
) {
  constructor(private authService: AuthService) {
    super(
      { header: 'Authorization', prefix: 'Api-Key ' },
      true,
      async (apikey, done) => {
        const user = await authService.validateApiKey(apikey)
        if (!user) {
          done(new UnauthorizedException(), false)
        }
        return done(null, user)
      },
    )
  }
}
