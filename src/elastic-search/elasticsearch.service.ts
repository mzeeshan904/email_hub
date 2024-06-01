import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';
import * as fs from 'fs';
import * as process from 'process';

@Injectable()
export class ElasticsearchService implements OnModuleInit {
  private readonly logger = new Logger(ElasticsearchService.name);
  private readonly client: Client;

  constructor() {
    this.client = new Client({
      node: process.env.ELASTICSEARCH_NODE || 'https://localhost:9200',
      auth: {
        username: process.env.ELASTICSEARCH_USERNAME || 'elastic',
        password: process.env.ELASTICSEARCH_PASSWORD || 'M-yLzON9d7m3lOnPkKzY',
      },
      tls: {
        // ca: fs.readFileSync(process.env.ELASTICSEARCH_CA_PATH || '../../http_ca.crt'),
        rejectUnauthorized: false, // Set to true in production
      },
    });
  }

  async onModuleInit() {
    const isConnected = await this.checkConnection();
    if (isConnected) {
      this.logger.log('Elasticsearch connected successfully');
    } else {
      this.logger.error('Failed to connect to Elasticsearch');
    }
  }

  private async checkConnection(): Promise<boolean> {
    try {
      await this.client.ping();
      return true;
    } catch (error) {
      this.logger.error('Elasticsearch cluster is down!', error.meta ? error.meta.body : error);
      return false;
    }
  }

  async indexData(index: string, body: any) {
    return await this.client.index({
      index,
      body,
    });
  }

  async search(index: string, query: any) {
    return await this.client.search({
      index,
      body: query,
    });
  }
}
