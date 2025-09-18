import { Module } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLinksController } from './short-links.controller';
import { RedirectController } from './redirect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from './entities/short-link.entity';
import { User } from '../users/entities/user.entity';
import { ClickLogsModule } from '@modules/click-logs/click-logs.module';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink, User]), ClickLogsModule],
  providers: [ShortLinksService],
  controllers: [ShortLinksController, RedirectController],
  exports: [ShortLinksService],
})
export class ShortLinksModule {}
