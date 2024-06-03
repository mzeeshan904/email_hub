import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '../elastic-search/elasticsearch.service';

@Injectable()
export class UserService {
  private readonly index = 'users';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createUser(user: any) {
    await this.elasticsearchService.createIndex(this.index);
    await this.elasticsearchService.addUser(this.index, user.outlookId, user);
    const newUser = await this.elasticsearchService.getUser(
      this.index,
      user.outlookId,
    );
    return newUser;
  }

  async getUserById(outlookId: string) {
    return this.elasticsearchService.getUser(this.index, outlookId);
  }

  async getAllUsers(query: string) {
    let searchQuery;
    if (query) {
      searchQuery = {
        query: {
          multi_match: {
            query,
            fields: ['firstName', 'lastName', 'email'],
          },
        },
      };
    } else {
      searchQuery = {
        query: {
          match_all: {},
        },
      };
    }
    const result = await this.elasticsearchService.getAllUsers(
      this.index,
      searchQuery,
    );
    return result;
  }
}
