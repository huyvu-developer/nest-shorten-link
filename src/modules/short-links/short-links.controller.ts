import { BaseController } from '@common/base/base.controller';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLink } from './entities/short-link.entity';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { Response } from 'express';

@Controller('short-links')
export class ShortLinksController extends BaseController<ShortLink> {
  constructor(private readonly shortLinkService: ShortLinksService) {
    super(shortLinkService);
  }

  @Post()
  async create(@Body() data: CreateShortLinkDto): Promise<ShortLink> {
    return this.shortLinkService.create(data);
  }

  @Get(':shortCode')
  async redirect(
    @Param('shortCode') shortCode: string,
    @Res() res: Response,
  ): Promise<void> {
    const shortLink = await this.shortLinkService.findByShortCode(shortCode);
    if (!shortLink) {
      throw new NotFoundException('Short link không tồn tại');
    }
    await this.shortLinkService.incrementClickCount(shortLink.id);
    return res.redirect(shortLink.originalUrl);
  }
}
