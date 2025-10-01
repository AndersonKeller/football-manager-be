import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1759280274799 implements MigrationInterface {
    name = 'InitialMigration1759280274799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "schedule_round" ("id" SERIAL NOT NULL, "gameId" integer, "scheduleId" integer, CONSTRAINT "PK_7913c653bee1dfe6d18df4409df" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "schedule_round" ADD CONSTRAINT "FK_8da45674001d4e2760d2b487b3a" FOREIGN KEY ("gameId") REFERENCES "game"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "schedule_round" ADD CONSTRAINT "FK_bd1b7e718828d596c6ba3fd9f1d" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "schedule_round" DROP CONSTRAINT "FK_bd1b7e718828d596c6ba3fd9f1d"`);
        await queryRunner.query(`ALTER TABLE "schedule_round" DROP CONSTRAINT "FK_8da45674001d4e2760d2b487b3a"`);
        await queryRunner.query(`DROP TABLE "schedule_round"`);
    }

}
