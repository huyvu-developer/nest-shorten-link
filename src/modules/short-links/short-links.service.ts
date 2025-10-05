import { BaseService } from '@common/base/base.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShortLink } from './entities/short-link.entity';
import { Repository } from 'typeorm';
import { generateShortCode } from '@utils/short-code.util';
import { CreateShortLinkDto } from './dto/create-short-link.dto';

@Injectable()
export class ShortLinksService extends BaseService<ShortLink> {
  constructor(
    @InjectRepository(ShortLink)
    private shortLinkRepository: Repository<ShortLink>,
  ) {
    super(shortLinkRepository);
  }

  async create(
    data: CreateShortLinkDto,
  ): Promise<ShortLink & { shortUrl: string }> {
    const { userId, originalUrl } = data;

    let existing: ShortLink | null = null;

    if (userId) {
      existing = await this.shortLinkRepository.findOne({
        where: { user: { id: userId }, originalUrl },
      });
      if (existing)
        return {
          ...existing,
          shortUrl: this.getShortUrl(existing.shortCode),
        };
    }

    let shortCode: string | null = null;
    let attempts = 0;
    while (attempts < 3) {
      attempts++;
      shortCode = generateShortCode(originalUrl);

      const shortCodeExists = await this.shortLinkRepository.findOne({
        where: { shortCode },
      });

      if (!shortCodeExists) {
        break;
      }

      shortCode = null;
    }

    if (!shortCode) {
      throw new Error('Có lỗi xảy ra khi tạo short link, vui lòng thử lại.');
    }

    return await this.shortLinkRepository.save({
      user: userId ? { id: userId } : undefined,
      originalUrl,
      shortCode,
      shortUrl: this.getShortUrl(shortCode),
    });
  }

  async findByUserId(userId: number): Promise<ShortLink[]> {
    const shortLinks = await this.shortLinkRepository.find({
      where: { user: { id: userId } },
    });
    return shortLinks.map((shortLink) => ({
      ...shortLink,
      shortUrl: this.getShortUrl(shortLink.shortCode),
    }));
  }

  async findByShortCode(
    shortCode: string,
  ): Promise<ShortLink & { shortUrl: string }> {
    const shortLink = await this.shortLinkRepository.findOne({
      where: { shortCode },
    });

    return {
      ...shortLink,
      shortUrl: this.getShortUrl(shortLink.shortCode),
    };
  }

  async incrementClickCount(shortLinkId: number): Promise<void> {
    await this.shortLinkRepository.increment(
      { id: shortLinkId },
      'clickCount',
      1,
    );
  }

  async getStatistical(userId: number): Promise<any> {
    const countLink = await this.shortLinkRepository.count({
      where: { user: { id: userId } },
    });
    return countLink;
  }

  private getShortUrl(shortCode: string): string {
    return `${process.env.BASE_URL || 'http://localhost:8080'}/${shortCode}`;
  }
}
