import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756823926329 implements MigrationInterface {
  name = "seed17771233123331";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO formation VALUES (1,'4-3-2-1',4,5,1),(2,'4-4-1-1',4,5,1),
(3,'4-5-1',4,5,1),(4,'4-3-1-2',4,4,2),(5,'4-4-2',4,4,2),(6,'4-2-2-2',4,4,2),
(7,'4-3-3',4,3,3),(8,'4-1-2-3',4,3,3),(9,'4-2-1-3',4,3,3),(10,'3-4-2-1',3,6,1),
(11,'3-5-1-1',3,6,1),(12,'3-6-1',3,6,1),(13,'3-3-2-2',3,5,2),(14,'3-4-1-2',3,5,2),
(15,'3-5-2',3,5,2),(16,'3-3-1-3',3,4,3),(17,'3-4-3',3,4,3),(18,'3-2-2-3',3,4,3),
(19,'5-3-1-1',5,4,1),(20,'5-4-1',5,4,1),(21,'5-2-2-1',5,4,1),(22,'5-3-2',5,3,2),
(23,'5-1-2-2',5,3,2),(24,'5-2-1-2',5,3,2);`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE from formation`);
  }
}
