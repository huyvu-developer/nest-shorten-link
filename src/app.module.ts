import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '@modules/users/users.module';
import { databaseConfig } from '@config/database.config';
import { ShortLinksModule } from '@modules/short-links/short-links.module';
import { ClickLogsModule } from '@modules/click-logs/click-logs.module';
import { LoggerMiddleware } from '@common/middlewares/logger.middleware';
import { jwtConfig } from '@config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    JwtModule.register(jwtConfig),
    UsersModule,
    ShortLinksModule,
    ClickLogsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
