import { Module } from '@nestjs/common';
import { ClickLogsService } from './click-logs.service';
import { ClickLogsController } from './click-logs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClickLog } from './entities/click-log.entity';
import { ShortLink } from '../short-links/entities/short-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClickLog, ShortLink])],
  providers: [ClickLogsService],
  controllers: [ClickLogsController],
  exports: [ClickLogsService],
})
export class ClickLogsModule {}
