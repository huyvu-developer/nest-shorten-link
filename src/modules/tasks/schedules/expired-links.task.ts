import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ShortLinksService } from '@modules/short-links/short-links.service';

@Injectable()
export class CleanExpiredLinksTask {
  constructor(private readonly shortLinkService: ShortLinksService) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async expiredLinksTask() {
    console.log('expiredLinksTask run');
    await this.shortLinkService.checkExpiredLinks();
  }
}
