import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import * as process from 'process';
import * as fs from 'fs';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  private readonly logger = new Logger(SearchService.name);
  // private readonly client: Client;
  constructor(private elasticsearchService:ElasticsearchService){

  }

  async indexData(index: string, body: any) {
    return await this.elasticsearchService.index({
      index,
      body,
    });
  }

  async search(index: string, query: any) {
    return await this.elasticsearchService.search({
      index,
      body: query,
    });
  }
}
