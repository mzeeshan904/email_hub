import { Module } from '@nestjs/common';
import { ElasticsearchModule } from './elasticsearch.module';
import { SearchController } from './search.controller';
import { ElasticsearchService } from './elasticsearch.service';

@Module({
  imports: [ElasticsearchModule],
  controllers: [SearchController],
  providers: [ElasticsearchService],
})
export class SearchModule {}
