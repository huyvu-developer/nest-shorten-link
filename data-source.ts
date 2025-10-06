// data-source.ts
import { DataSource } from 'typeorm';
import { dataSourceConfig } from './src/config/database.config';

export const AppDataSource = new DataSource(dataSourceConfig);
// "migration:generate": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:generate -d ./data-source.ts",
// "migration:run": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d ./data-source.ts",
// "migration:revert": "ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d ./data-source.ts"
