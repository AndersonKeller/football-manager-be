import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757134455904 implements MigrationInterface {
    name = 'InitialMigration1757134455904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stadium" DROP CONSTRAINT "FK_943ac2366381d520fabe4c9f5c1"`);
        await queryRunner.query(`ALTER TABLE "stadium" ALTER COLUMN "stadiumAreaId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stadium" ADD CONSTRAINT "FK_943ac2366381d520fabe4c9f5c1" FOREIGN KEY ("stadiumAreaId") REFERENCES "stadium_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stadium" DROP CONSTRAINT "FK_943ac2366381d520fabe4c9f5c1"`);
        await queryRunner.query(`ALTER TABLE "stadium" ALTER COLUMN "stadiumAreaId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "stadium" ADD CONSTRAINT "FK_943ac2366381d520fabe4c9f5c1" FOREIGN KEY ("stadiumAreaId") REFERENCES "stadium_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
