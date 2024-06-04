// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ElasticsearchModule } from '../elastic-search/elasticsearch.module';
import { OutlookModule } from '../outlook/outlook.module';

@Module({
  imports: [ElasticsearchModule, OutlookModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
