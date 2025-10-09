import {
  Controller,
  Get,
  NotFoundException,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { User } from '@modules/users/entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@UseGuards(AuthGuard('jwt'))
@Controller('api/statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistical(
    @Req() req: Request & { user: User },
    @Query() query: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.id;
    if (!userId) {
      throw new NotFoundException('User ID not found');
    }

    return this.statisticsService.getStatisticalTotal(
      userId,
      query.startDate,
      query.endDate,
    );
  }

  @Get('click-count-chart')
  async getClickCountChart(
    @Req() req: Request & { user: User },
    @Query() query: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.id;
    return this.statisticsService.getClickCountChart(
      userId,
      query.startDate,
      query.endDate,
    );
  }

  @Get('short-link-chart')
  async getShortLinkChart(
    @Req() req: Request & { user: User },
    @Query() query: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.id;
    return this.statisticsService.getShortLinkChart(
      userId,
      query.startDate,
      query.endDate,
    );
  }

  @Get('browser-chart')
  async getBrowserChart(
    @Req() req: Request & { user: User },
    @Query() query: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.id;
    return this.statisticsService.getBrowserChart(
      userId,
      query.startDate,
      query.endDate,
    );
  }

  @Get('os-chart')
  async getOSChart(
    @Req() req: Request & { user: User },
    @Query() query: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.id;
    return this.statisticsService.getOSChart(
      userId,
      query.startDate,
      query.endDate,
    );
  }

  @Get('device-chart')
  async getDeviceChart(
    @Req() req: Request & { user: User },
    @Query() query: { startDate: Date; endDate: Date },
  ) {
    const userId = req?.user?.id;
    return this.statisticsService.getDeviceChart(
      userId,
      query.startDate,
      query.endDate,
    );
  }
}
