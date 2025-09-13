import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757731581740 implements MigrationInterface {
    name = 'InitialMigration1757731581740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_settings" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "player_settings" ADD "value" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_settings" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "player_settings" ADD "value" integer`);
    }

}
