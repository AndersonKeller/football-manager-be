import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1759280427194 implements MigrationInterface {
    name = 'InitialMigration1759280427194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_round" ADD "date" date NOT NULL`);
        await queryRunner.query(`ALTER TABLE "schedule_round" ADD "round" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_round" DROP COLUMN "round"`);
        await queryRunner.query(`ALTER TABLE "schedule_round" DROP COLUMN "date"`);
    }

}
