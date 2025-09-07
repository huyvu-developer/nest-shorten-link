import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { databaseConfig } from '@config/database.config';
import { ShortLinksModule } from '@modules/short-links/short-links.module';
import { ClickLogsModule } from '@modules/click-logs/click-logs.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    UsersModule,
    ShortLinksModule,
    ClickLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
