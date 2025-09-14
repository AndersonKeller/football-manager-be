import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757819960476 implements MigrationInterface {
    name = 'InitialMigration1757819960476'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league" ADD "division" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league" DROP COLUMN "division"`);
    }

}
