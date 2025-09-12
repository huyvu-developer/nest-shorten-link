import { BaseController } from '@common/base/base.controller';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLink } from './entities/short-link.entity';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@modules/users/entities/user.entity';
import * as geoip from 'geoip-lite';
import { ClickLogsService } from '@modules/click-logs/click-logs.service';

@Controller('short-links')
export class ShortLinksController extends BaseController<ShortLink> {
  constructor(
    private readonly shortLinkService: ShortLinksService,
    private readonly clickLogsService: ClickLogsService,
  ) {
    super(shortLinkService);
  }

  @Post()
  async create(@Body() data: CreateShortLinkDto): Promise<ShortLink> {
    return this.shortLinkService.create(data);
  }

  @Get('redirect/:shortCode')
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

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  async findByUserId(
    @Req() req: Request & { user: User },
  ): Promise<ShortLink[]> {
    const userId = req?.user?.id;
    if (!userId) {
      throw new NotFoundException('User ID not found');
    }
    return this.shortLinkService.findByUserId(userId);
  }
}
