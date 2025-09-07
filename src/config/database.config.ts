import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '@modules/users/entities/user.entity';
import { ShortLink } from '@modules/short-links/entities/short-link.entity';
import { ClickLog } from '@modules/click-logs/entities/click-log.entity';

export const databaseConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DATABASE_HOST || 'mysql',
  port: parseInt(process.env.DATABASE_PORT) || 3306,
  username: process.env.DATABASE_USER || 'root',
  password: process.env.DATABASE_PASSWORD || 'password',
  database: process.env.DATABASE_NAME || 'shorten_link',
  entities: [User, ShortLink, ClickLog],
  synchronize: process.env.NODE_ENV === 'development',
  logging: process.env.NODE_ENV === 'development',
  retryAttempts: 10,
  retryDelay: 3000,
  autoLoadEntities: true,
  migrations: ['dist/migrations/*.js'],
  migrationsRun: false,
};
