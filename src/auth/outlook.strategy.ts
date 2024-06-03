import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-outlook';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OutlookStrategy extends PassportStrategy(Strategy, 'outlook') {
  constructor(private configService: ConfigService) {
    super({
      clientID: configService.get<string>('OUTLOOK_CLIENT_ID'),
      clientSecret: configService.get<string>('OUTLOOK_CLIENT_SECRET'),
      callbackURL: configService.get<string>('OUTLOOK_CALLBACK_URL'),
      passReqToCallback: true,
      scope: ['openid', 'profile', 'offline_access', 'https://outlook.office.com/Mail.Read'],
    });
  }

  async validate(req, accessToken, refreshToken, profile, done: Function) {
    const user = {
      outlookId: profile.id,
      email: profile._json.EmailAddress,
      displayName: profile.displayName,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}