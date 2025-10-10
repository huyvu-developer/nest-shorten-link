import { ClickLog } from '@modules/click-logs/entities/click-log.entity';
import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(ShortLink)
    private shortLinkRepository: Repository<ShortLink>,
    @InjectRepository(ClickLog)
    private clickLogRepository: Repository<ClickLog>,
  ) {}

  async getStatisticalTotal(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    const totalLink = await this.shortLinkRepository.count({
      where: { user: { id: userId }, createdAt: Between(startDate, endDate) },
    });

    const totalClick = await this.clickLogRepository.count({
      where: {
        shortLink: { user: { id: userId } },
        clickedAt: Between(startDate, endDate),
      },
    });

    const totalLinkExpired = await this.shortLinkRepository.count({
      where: {
        user: { id: userId },
        isExpired: true,
        updatedAt: Between(startDate, endDate),
      },
    });

    return {
      totalLink,
      totalClick,
      totalLinkExpired,
    };
  }

  async getClickCountChart(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<{ day: string; count: number }[]> {
    const query = this.clickLogRepository
      .createQueryBuilder('clickLog')
      .innerJoin('clickLog.shortLink', 'shortLink')
      .innerJoin('shortLink.user', 'user')
      .select('DATE(clickLog.clickedAt)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('user.id = :userId', { userId })
      .andWhere('clickLog.clickedAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('date')
      .orderBy('date', 'ASC');

    return query.getRawMany();
  }

  async getShortLinkChart(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<{ date: string; count: number }[]> {
    const query = this.shortLinkRepository
      .createQueryBuilder('shortLink')
      .innerJoin('shortLink.user', 'user')
      .select('DATE(shortLink.createdAt)', 'date')
      .addSelect('COUNT(*)', 'count')
      .where('user.id = :userId', { userId })
      .andWhere('shortLink.createdAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('date')
      .orderBy('date', 'ASC');

    return query.getRawMany();
  }

  private async getClickLogChartByField(
    userId: number,
    startDate: Date,
    endDate: Date,
    field: 'browser' | 'os' | 'device',
  ): Promise<{ name: string; count: number }[]> {
    const query = this.clickLogRepository
      .createQueryBuilder('clickLog')
      .innerJoin('clickLog.shortLink', 'shortLink')
      .innerJoin('shortLink.user', 'user')
      .select(`clickLog.${field}`, 'name')
      .addSelect('COUNT(*)', 'count')
      .where('user.id = :userId', { userId })
      .andWhere('clickLog.clickedAt BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('name')
      .orderBy('count', 'DESC');

    return query.getRawMany();
  }

  async getBrowserChart(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<{ name: string; count: number }[]> {
    return this.getClickLogChartByField(userId, startDate, endDate, 'browser');
  }

  async getOSChart(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<{ name: string; count: number }[]> {
    return this.getClickLogChartByField(userId, startDate, endDate, 'os');
  }

  async getDeviceChart(
    userId: number,
    startDate: Date,
    endDate: Date,
  ): Promise<{ name: string; count: number }[]> {
    return this.getClickLogChartByField(userId, startDate, endDate, 'device');
  }
}
