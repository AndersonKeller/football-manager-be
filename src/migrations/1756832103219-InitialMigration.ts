import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756832103219 implements MigrationInterface {
    name = 'InitialMigration1756832103219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nationality" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_ec4111a2e9f11d6b69312e4a77f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_teams" ("id" SERIAL NOT NULL, "starter" boolean NOT NULL, "captain" boolean NOT NULL, "long_fk_taker" boolean NOT NULL, "short_fk_taker" boolean NOT NULL, "left_ck_taker" boolean NOT NULL, "right_ck_taker" boolean NOT NULL, "penalty_taker" boolean NOT NULL, "number" integer NOT NULL, "playerId" integer NOT NULL, "teamsId" uuid NOT NULL, CONSTRAINT "PK_e5590318e146470273cc6fa9b59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "strip_name" character varying(255) NOT NULL, "nationalityId" integer NOT NULL, CONSTRAINT "PK_65edadc946a7faf4b638d5e8885" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "player_teams" ADD CONSTRAINT "FK_7f5154f81cfd8e26507e5939ee2" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_teams" ADD CONSTRAINT "FK_5942ce03406f8604ff036aa0eb9" FOREIGN KEY ("teamsId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player" ADD CONSTRAINT "FK_037cf8a006e9cecb55e52632cdd" FOREIGN KEY ("nationalityId") REFERENCES "nationality"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player" DROP CONSTRAINT "FK_037cf8a006e9cecb55e52632cdd"`);
        await queryRunner.query(`ALTER TABLE "player_teams" DROP CONSTRAINT "FK_5942ce03406f8604ff036aa0eb9"`);
        await queryRunner.query(`ALTER TABLE "player_teams" DROP CONSTRAINT "FK_7f5154f81cfd8e26507e5939ee2"`);
        await queryRunner.query(`DROP TABLE "player"`);
        await queryRunner.query(`DROP TABLE "player_teams"`);
        await queryRunner.query(`DROP TABLE "nationality"`);
    }

}
