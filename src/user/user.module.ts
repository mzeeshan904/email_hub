// src/user/user.module.ts
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ElasticsearchModule } from '../elastic-search/elasticsearch.module';

@Module({
  imports: [ElasticsearchModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
