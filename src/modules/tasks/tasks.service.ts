import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  constructor(private readonly schedulerRegistry: SchedulerRegistry) {}

  addCronJob(name: string, cronTime: string, callback: () => void) {
    if (this.schedulerRegistry.doesExist('cron', name)) {
      return;
    }

    const job = new CronJob(cronTime, () => {
      callback();
    });

    this.schedulerRegistry.addCronJob(name, job);
    job.start();
  }

  stopCronJob(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    if (!job) {
      return;
    }
    job.stop();
  }

  startCronJob(name: string) {
    const job = this.schedulerRegistry.getCronJob(name);
    if (!job) {
      return;
    }
    job.start();
  }

  deleteCronJob(name: string) {
    this.schedulerRegistry.deleteCronJob(name);
  }

  listCronJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();
    const list = [];
    jobs.forEach((value, key) => {
      list.push({ name: key, running: value.isActive });
    });
    return list;
  }
}
