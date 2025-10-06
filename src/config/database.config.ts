import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity';
import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import { ClickLog } from '@modules/click-logs/entities/click-log.entity';
import { DataSourceOptions } from 'typeorm';

export const dataSourceConfig: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'mysql',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'shorten_link',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  migrations: ['dist/src/migrations/*.js'],
  logging: process.env.NODE_ENV === 'development',
  migrationsRun: false, // Quyết định typeORM có tự động chạy tất cả các migration khi khởi động ứng dụng không
};

export const databaseConfig: TypeOrmModuleOptions = {
  ...dataSourceConfig,
  entities: [User, ShortLink, ClickLog],
  retryAttempts: 10, // Số lần kết nối lại
  retryDelay: 3000, // Thời gian chờ thử kết nối lại
  autoLoadEntities: true, // Tự động tải các entity được khai báo trong các modules
  // migrations: ['dist/migrations/*.js'], // Đường dẫn đến các file migrations
};
