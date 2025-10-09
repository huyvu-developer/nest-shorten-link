import { User } from '@modules/users/entities/user.entity';
import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import { ClickLog } from '@modules/click-logs/entities/click-log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink, User, ClickLog])],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
