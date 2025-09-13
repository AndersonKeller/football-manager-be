import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17734412377234";
  // 17734412377233-seed
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO appearance VALUES (1,'Height',true,148,205),(2,'Weight',true,40,123);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from appearance`);
  }
}
