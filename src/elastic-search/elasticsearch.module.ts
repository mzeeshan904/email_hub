import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchController } from './search.controller';
import { SearchService } from './elasticsearch.service';
import UserSearchService from './user.service';


 
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: 'https://localhost:9200',
        auth: {
          username: 'elastic',
          password: 'EiU5xRTIomIoRe3Z7RIn',
        },
        tls: {
          // ca: fs.readFileSync(process.env.ELASTICSEARCH_CA_PATH || '../../http_ca.crt'),
          rejectUnauthorized: false, // Set to true in production
        },
      }),
    }),
  ],
  providers: [SearchService, UserSearchService],
  exports: [ElasticsearchModule ],
  controllers:[SearchController]
})
export class ElasticSearchModule {}