import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757132300143 implements MigrationInterface {
    name = 'InitialMigration1757132300143'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" ADD "nationalityId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_66ee4dea0160e15152e73042c13" FOREIGN KEY ("nationalityId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_66ee4dea0160e15152e73042c13"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "nationalityId"`);
    }

}
