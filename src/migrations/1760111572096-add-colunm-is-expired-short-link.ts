import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColunmIsExpiredShortLink1760111572096
  implements MigrationInterface
{
  name = 'AddColunmIsExpiredShortLink1760111572096';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`short_links\` ADD \`is_expired\` tinyint NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`short_links\` DROP COLUMN \`is_expired\``,
    );
  }
}
