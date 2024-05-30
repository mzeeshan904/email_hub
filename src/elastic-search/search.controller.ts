import { Controller, Get, Query } from '@nestjs/common';
import { ElasticsearchService } from './elasticsearch.service';

@Controller('search')
export class SearchController {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  @Get()
  async search(@Query('q') query: string) {
    const result = await this.elasticsearchService.search('my-index', {
      query: {
        match: {
          message: query,
        },
      },
    });
    return result.hits.hits;
  }
}
