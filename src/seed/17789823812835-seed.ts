import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17789823812835";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO position_category VALUES (1,'Goal Keeper','GK'),(2,'Defender','DF'),(3,'Midfielder','MF'),(4,'Forward','FW');`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from position_category`);
  }
}
