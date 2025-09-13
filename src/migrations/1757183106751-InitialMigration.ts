import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757183106751 implements MigrationInterface {
    name = 'InitialMigration1757183106751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league" ADD "nationalityId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "league" ADD CONSTRAINT "FK_942daabfbb5a633afb7f7d476be" FOREIGN KEY ("nationalityId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league" DROP CONSTRAINT "FK_942daabfbb5a633afb7f7d476be"`);
        await queryRunner.query(`ALTER TABLE "league" DROP COLUMN "nationalityId"`);
    }

}
