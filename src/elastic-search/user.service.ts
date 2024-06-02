import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";

@Injectable()
export default class UserSearchService {
  private index = 'users'
 
  constructor(
    private readonly elasticsearchService: ElasticsearchService
  ) {}
 
  async indexUser(user) {
    return this.elasticsearchService.index({
      index: this.index,
      body: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      }
    })
  }
 
  async search(text: string) {
    const body = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['firstName', 'lastName', 'email']
          }
        }
      }
    })
    const hits = body.hits.hits;
    return hits.map((item) => item._source);
  }
}