import { Injectable } from '@nestjs/common';
import { ElasticsearchService as NestElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class ElasticsearchService {
  constructor(private readonly elasticsearchService: NestElasticsearchService) {}

  async createIndex(index: string) {
    console.log("create index called")
    const indexExists = await this.elasticsearchService.indices.exists({ index });
    if (!indexExists) {
      await this.elasticsearchService.indices.create({ index });
    }
  }

  async addUser(index: string, id: string, user: any) {
    console.log('elasticsearch service add user called');
    await this.elasticsearchService.index({
      index,
      id,
      document: user, 
    });
  }


  async getUser(index: string, id: string): Promise<any> {
    console.log('get called');
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

  async search(index: string, query: any): Promise<any[]> {
    console.log('search called');
    const result = await this.elasticsearchService.search({
      index,
      body: query,  
    });
    return result.hits.hits.map(hit => hit._source);  
  }

  async bulk(ops: any[]): Promise<void> {
    await this.elasticsearchService.bulk({ operations: ops });  
  }


  async updateUser(index: string, id: string, updatedUser: any) {
    console.log('elasticsearch service update user called');
    await this.elasticsearchService.update({
      index,
      id,
      body: {
        doc: updatedUser
      }
    });
  }

  async deleteUser(index: string, id: string) {
    console.log('elasticsearch service delete user called');
    await this.elasticsearchService.delete({
      index,
      id
    });
  }

}

