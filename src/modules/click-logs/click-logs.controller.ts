import { Controller, Get, Param } from '@nestjs/common';
import { ClickLog } from './entities/click-log.entity';
import { BaseController } from '@common/base/base.controller';
import { ClickLogsService } from './click-logs.service';

@Controller('click-logs')
export class ClickLogsController extends BaseController<ClickLog> {
  constructor(private readonly clickLogsService: ClickLogsService) {
    super(clickLogsService);
  }

  @Get('short-link/:shortLinkId')
  async getByShortLinkId(@Param('shortLinkId') shortLinkId: number) {
    return this.clickLogsService.getByShortLinkId(shortLinkId);
  }
}
