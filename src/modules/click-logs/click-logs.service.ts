import { Injectable } from '@nestjs/common';
import { ClickLog } from './entities/click-log.entity';
import { BaseService } from '@common/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClickLogsService extends BaseService<ClickLog> {
  constructor(
    @InjectRepository(ClickLog)
    private clickLogRepository: Repository<ClickLog>,
  ) {
    super(clickLogRepository);
  }

  getByShortLinkId(shortLinkId: number): Promise<ClickLog[]> {
    return this.clickLogRepository.find({
      where: { shortLink: { id: shortLinkId } },
    });
  }
}
