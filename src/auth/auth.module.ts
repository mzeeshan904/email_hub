// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { OutlookStrategy } from './outlook.strategy';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '../elastic-search/elasticsearch.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'outlook' }),
    ConfigModule,
    ElasticsearchModule,
  ],
  controllers: [AuthController],
  providers: [OutlookStrategy, UserService],
})
export class AuthModule {}
