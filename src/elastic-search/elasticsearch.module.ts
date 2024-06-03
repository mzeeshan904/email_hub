import { Module } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';
import { ElasticsearchModule as NestElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    NestElasticsearchModule.register({
      node: 'https://localhost:9200', 
      auth: {
        username: 'elastic',
        password: 'bcjluptFQPhDVOQ_-1bO',
      },
      tls: {
        // ca: fs.readFileSync(process.env.ELASTICSEARCH_CA_PATH || '../../http_ca.crt'),
        rejectUnauthorized: false, // Set to true in production
      },
    }),
  ],
  providers: [ElasticsearchService],
  exports: [ElasticsearchService],
})
export class ElasticsearchModule {}
