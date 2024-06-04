// src/outlook/outlook.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ElasticsearchService } from '../elastic-search/elasticsearch.service';

@Injectable()
export class OutlookService {
  private readonly logger = new Logger(OutlookService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly esClient: ElasticsearchService,
  ) {}

  // Fetch emails from Outlook API
  async fetchEmails(accessToken: string, userId: string, nextLink?: string): Promise<void> {
    const url = nextLink || `https://graph.microsoft.com/v1.0/me/mailFolders/Inbox/messages`;

    try {
      const response = await this.httpService.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      }).toPromise();

      const emails = response.data.value;
      await this.storeEmails(emails);

      if (response.data['@odata.nextLink']) {
        await this.fetchEmails(accessToken, userId, response.data['@odata.nextLink']);
      }
    } catch (error) {
      this.logger.error('Error fetching emails', error);
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers['retry-after'];
        await new Promise(res => setTimeout(res, retryAfter * 1000));
        return this.fetchEmails(accessToken, userId, nextLink);
      }
      throw error;
    }
  }

  // Store emails in Elasticsearch
  private async storeEmails(emails: any[]): Promise<void> {
    const bulkOps = emails.flatMap(email => [
      { update: { _index: 'emails', _id: email.id } },
      {
        doc: {
          outlookId: email.id,
          subject: email.subject,
          body: email.bodyPreview,
          from: email.from.emailAddress.address,
          to: email.toRecipients.map(recipient => recipient.emailAddress.address),
          receivedDateTime: new Date(email.receivedDateTime),
          isRead: email.isRead,
          flag: email.flag.flagStatus,
          deleted: false,
        },
        doc_as_upsert: true,
      }
    ]);

    await this.esClient.bulk(bulkOps);
  }

  // Process resource changes from webhook notifications
  async processResource(resourceId: string): Promise<void> {
    const email = await this.fetchEmailById(resourceId);
    if (email) {
      await this.storeEmails([email]);
    } else {
      await this.esClient.bulk([
        { update: { _index: 'emails', _id: resourceId } },
        { doc: { deleted: true }, doc_as_upsert: true },
      ]);
    }
  }

  // Fetch email by ID from Microsoft Graph API
  async fetchEmailById(id: string): Promise<any> {
    // Implementation for fetching a single email by ID from Microsoft Graph API
  }
}
