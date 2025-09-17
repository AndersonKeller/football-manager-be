import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757874475997 implements MigrationInterface {
    name = 'InitialMigration1757874475997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" ADD "round" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "game" DROP COLUMN "round"`);
    }

}
