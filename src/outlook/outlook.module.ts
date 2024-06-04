// src/outlook/outlook.module.ts
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OutlookService } from './outlook.service';
import { ElasticsearchModule } from '../elastic-search/elasticsearch.module';

@Module({
  imports: [HttpModule, ElasticsearchModule],
  providers: [OutlookService],
  exports: [OutlookService],
})
export class OutlookModule {}
