import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ShortLinksModule } from '@modules/short-links/short-links.module';
import { CleanExpiredLinksTask } from './schedules/expired-links.task';

@Module({
  providers: [TasksService, CleanExpiredLinksTask],
  imports: [ScheduleModule, ShortLinksModule],
})
export class TasksModule {}
