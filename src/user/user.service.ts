import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '../elastic-search/elasticsearch.service';
import { OutlookService } from '../outlook/outlook.service';

@Injectable()
export class UserService {
  private readonly index = 'users';

  constructor(
    private readonly elasticsearchService: ElasticsearchService,
    private readonly outlookService: OutlookService,
  ) {}

  async createUser(user: any) {
    await this.elasticsearchService.createIndex(this.index);
    await this.elasticsearchService.addUser(this.index, user.outlookId, user);
    const newUser = await this.elasticsearchService.getUser(
      this.index,
      user.outlookId,
    );

    // Trigger initial email synchronization
    // await this.outlookService.fetchEmails(user.accessToken, user.outlookId);

    return newUser;
  }

  async getUserById(outlookId: string) {
    return this.elasticsearchService.getUser(this.index, outlookId);
  }
  async getAllUsers() {
    return this.elasticsearchService.search(this.index, {}); 
  }

  async updateUser(outlookId: string, updatedUser: any) {
    await this.elasticsearchService.updateUser(this.index, outlookId, updatedUser);
  }

  async deleteUser(outlookId: string) {
    await this.elasticsearchService.deleteUser(this.index, outlookId);
  }
}
