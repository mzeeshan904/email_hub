import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(
    private readonly elasticsearchService: NestElasticsearchService,
  ) {}
  async createIndex(index: string) {
    const indexExists = await this.elasticsearchService.indices.exists({
      index,
    });
    if (!indexExists) {
      await this.elasticsearchService.indices.create({ index });
    }
  }

  async addUser(index: string, id: string, user: any) {
    await this.elasticsearchService.index({
      index,
      id,
      body: user,
    });
  }

  async getUser(index: string, id: string) {
    try {
      const result = await this.elasticsearchService.get({
        index,
        id,
      });
      return result._source;
    } catch (error) {
      if (error.meta.statusCode === 404) {
        return null;
      }
      throw error;
    }
  }

  async getAllUsers(index: string, query: any) {
    const result = await this.elasticsearchService.search({
      index,
      body: query,
    });
    return result.hits.hits.map((hit) => hit._source);
  }
}
