import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Req,
  Res,
} from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLink } from './entities/short-link.entity';
import { Response, Request } from 'express';

import * as geoip from 'geoip-lite';
import { ClickLogsService } from '@modules/click-logs/click-logs.service';

@Controller()
export class RedirectController {
  constructor(
    private readonly shortLinkService: ShortLinksService,
    private readonly clickLogsService: ClickLogsService,
  ) {}

  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
    @Req() req: Request,
  ): Promise<void> {
    const shortLink = await this.shortLinkService.findByShortCode(shortCode);
    if (!shortLink) {
      throw new NotFoundException('Short link không tồn tại');
    }

    const ip =
      (req.headers['x-forwarded-for'] as string)?.split(',')[0].trim() ||
      req.ip ||
      null;
    const userAgent = req.headers['user-agent'] || null;
    const geo = geoip.lookup(ip);

    await this.clickLogsService.create({
      shortLink: { id: shortLink.id } as ShortLink,
      ipAddress: ip,
      userAgent: userAgent,
      country: geo?.country || null,
    });

    await this.shortLinkService.incrementClickCount(shortLink.id);
    return res.redirect(shortLink.originalUrl);
  }
}
