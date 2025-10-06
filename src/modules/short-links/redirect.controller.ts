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
import { UAParser } from 'ua-parser-js';

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
    const ua = new UAParser(req.headers['user-agent']).getResult();
    const geo = geoip.lookup(ip);
    console.log('ua', ua, 'geo', geo);

    await this.clickLogsService.create({
      shortLink: { id: shortLink.id } as ShortLink,
      ipAddress: ip,
      userAgent: userAgent,
      address: JSON.stringify(geo),
      browser: ua.browser.name,
      os: ua.os.name,
      device: ua.device.type,
    });

    await this.shortLinkService.incrementClickCount(shortLink.id);
    return res.redirect(shortLink.originalUrl);
  }
}
