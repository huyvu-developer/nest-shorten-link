import { Module } from '@nestjs/common';
import { ShortLinksService } from './short-links.service';
import { ShortLinksController } from './short-links.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortLink } from './entities/short-link.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShortLink, User])],
  providers: [ShortLinksService],
  controllers: [ShortLinksController],
  exports: [ShortLinksService],
})
export class ShortLinksModule {}
