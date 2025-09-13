import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757451416563 implements MigrationInterface {
    name = 'InitialMigration1757451416563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stadium" ADD "ticket" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stadium" DROP COLUMN "ticket"`);
    }

}
