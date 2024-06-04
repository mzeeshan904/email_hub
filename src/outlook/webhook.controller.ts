import { Controller, Post, Body, Req } from '@nestjs/common';
import { OutlookService } from './outlook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly outlookService: OutlookService) {}

  @Post('subscription')
  async handleSubscription(@Body() body: any, @Req() req: any) {
    const { value: notifications } = body;

    for (const notification of notifications) {
      const { resource } = notification;
      const resourceId = resource.split('/').pop();
      await this.outlookService.processResource(resourceId);
    }

    return { status: 'ok' };
  }
}
