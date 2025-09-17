import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1757874240498 implements MigrationInterface {
    name = 'InitialMigration1757874240498'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "game" ("id" SERIAL NOT NULL, "homeId" uuid, "awayId" uuid, "scheduleId" integer, CONSTRAINT "PK_352a30652cd352f552fef73dec5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "schedule" ("id" SERIAL NOT NULL, "year" integer NOT NULL, "month" integer NOT NULL, "leagueId" integer, CONSTRAINT "PK_1c05e42aec7371641193e180046" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_55a5716adb9002cfe5d5706773b" FOREIGN KEY ("homeId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_089643fd573053c8b4b52dd74dd" FOREIGN KEY ("awayId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "game" ADD CONSTRAINT "FK_b41d5a9e77a5d1f017c4f13f44f" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule" ADD CONSTRAINT "FK_63187ca27f16d25012aaf6fe9fa" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule" DROP CONSTRAINT "FK_63187ca27f16d25012aaf6fe9fa"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_b41d5a9e77a5d1f017c4f13f44f"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_089643fd573053c8b4b52dd74dd"`);
        await queryRunner.query(`ALTER TABLE "game" DROP CONSTRAINT "FK_55a5716adb9002cfe5d5706773b"`);
        await queryRunner.query(`DROP TABLE "schedule"`);
        await queryRunner.query(`DROP TABLE "game"`);
    }

}
