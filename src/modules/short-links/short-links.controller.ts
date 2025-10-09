import { BaseController } from '@common/base/base.controller';
import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLink } from './entities/short-link.entity';
import { CreateShortLinkDto } from './dto/create-short-link.dto';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@modules/users/entities/user.entity';

@Controller('api/short-links')
export class ShortLinksController extends BaseController<ShortLink> {
  constructor(private readonly shortLinkService: ShortLinksService) {
    super(shortLinkService);
  }

  @Post()
  async create(@Body() data: CreateShortLinkDto): Promise<ShortLink> {
    return this.shortLinkService.create(data);
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
