import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1756833608604 implements MigrationInterface {
    name = 'InitialMigration1756833608604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "player_teams" DROP CONSTRAINT "FK_5942ce03406f8604ff036aa0eb9"`);
        await queryRunner.query(`ALTER TABLE "player_teams" RENAME COLUMN "teamsId" TO "teamId"`);
        await queryRunner.query(`CREATE TABLE "player_abilities" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "playerId" integer NOT NULL, "abilityId" integer NOT NULL, CONSTRAINT "PK_a751f8a1aed68bddf1939397fa9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_appearances" ("id" SERIAL NOT NULL, "value" integer NOT NULL, "playerId" integer NOT NULL, "appearanceId" integer NOT NULL, "appearanceValueId" integer, CONSTRAINT "PK_26b59d91bd6a06b96d0911e90f8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_positions" ("id" SERIAL NOT NULL, "registered" boolean NOT NULL, "playerId" integer NOT NULL, "positionId" integer NOT NULL, CONSTRAINT "PK_5b358a4a43b26bbb727bc235d00" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_settings" ("id" SERIAL NOT NULL, "value" integer, "playerId" integer NOT NULL, "settingId" integer NOT NULL, "settingValueId" integer, CONSTRAINT "PK_4fefa6c866a45c4ab49823d99ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "player_special_abilities" ("id" SERIAL NOT NULL, "active" boolean NOT NULL, "playerId" integer NOT NULL, "specialAbilityId" integer NOT NULL, CONSTRAINT "PK_8ed3c3079b562d8b233047da248" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "ability" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "min" integer NOT NULL DEFAULT '1', "max" integer NOT NULL DEFAULT '99', CONSTRAINT "PK_5643559d435d01ec126981417a2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appearance" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "required" boolean NOT NULL, "min" integer, "max" integer, CONSTRAINT "PK_c7c434b1171b1b86762102bfc6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appearance_value" ("id" SERIAL NOT NULL, "value" character varying(255) NOT NULL, "appearanceId" integer NOT NULL, CONSTRAINT "PK_04ba0fbfdf245f8e7ddec006980" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "formation" ("id" SERIAL NOT NULL, "name" character varying(120) NOT NULL, "defenders" integer NOT NULL, "midfielders" integer NOT NULL, "forwards" integer NOT NULL, CONSTRAINT "PK_0b7ed8d0239c80921e788650b0d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "league" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "strip_name" character varying(52), "categoryId" integer NOT NULL, CONSTRAINT "PK_0bd74b698f9e28875df738f7864" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "league_category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_dce39f0297f6d6213ba95af002b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position_category" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "short" character varying(40) NOT NULL, CONSTRAINT "PK_ac5001becda6e2c2e37e16cb415" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "position" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "short" character varying(45) NOT NULL, "positionCategoryId" integer NOT NULL, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "setting" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, "required" boolean NOT NULL, "min" integer, "max" integer, CONSTRAINT "PK_fcb21187dc6094e24a48f677bed" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "setting_value" ("id" SERIAL NOT NULL, "value" character varying(255) NOT NULL, "settingId" integer NOT NULL, CONSTRAINT "PK_2e5c7bf6bd3290180eccca32fe8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stadium" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "capacity" integer NOT NULL, "stadiumAreaId" integer NOT NULL, CONSTRAINT "PK_e1fec3f13003877cd87a990655d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "stadium_area" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, CONSTRAINT "PK_e728df1441a8f7035303f918062" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "special_ability" ("id" SERIAL NOT NULL, "name" character varying(255) NOT NULL, "description" character varying(255) NOT NULL, CONSTRAINT "PK_dbb3817cb14152d64f6fbcd0324" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "team" ADD "short" character varying(45) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD "leagueId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD "stadiumId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD "formationId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_36d02c93049412c8e95bd478de9" FOREIGN KEY ("leagueId") REFERENCES "league"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_0eba600ad102afc15975a3f102c" FOREIGN KEY ("stadiumId") REFERENCES "stadium"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "team" ADD CONSTRAINT "FK_2b4c16ed072c7b227fdbc5c07cc" FOREIGN KEY ("formationId") REFERENCES "formation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_teams" ADD CONSTRAINT "FK_0693d48dc4eedae44367817327a" FOREIGN KEY ("teamId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_abilities" ADD CONSTRAINT "FK_3b4c1ee71dc08f4750eaf293c36" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_abilities" ADD CONSTRAINT "FK_b1b8c1d051064300a9e6f338368" FOREIGN KEY ("abilityId") REFERENCES "ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_appearances" ADD CONSTRAINT "FK_02299af2bce6c636e3a5ee3dbd3" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_appearances" ADD CONSTRAINT "FK_1a29de4a84f8b832b7dd57a066e" FOREIGN KEY ("appearanceId") REFERENCES "appearance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_appearances" ADD CONSTRAINT "FK_cdcdb7a0fc571934357f722cbed" FOREIGN KEY ("appearanceValueId") REFERENCES "appearance_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_positions" ADD CONSTRAINT "FK_92eaefdee1a617afa7b26fb347c" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_positions" ADD CONSTRAINT "FK_ead63b28d2cfad4ad91ddfc294b" FOREIGN KEY ("positionId") REFERENCES "position"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_settings" ADD CONSTRAINT "FK_43ccfbeeabe06a10a1548d7b7ec" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_settings" ADD CONSTRAINT "FK_88ef6813b9f2f73bb244b19d16d" FOREIGN KEY ("settingId") REFERENCES "setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_settings" ADD CONSTRAINT "FK_04ab71bf328d7355c9d99363485" FOREIGN KEY ("settingValueId") REFERENCES "setting_value"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_special_abilities" ADD CONSTRAINT "FK_8ded5b96f5c85150ab0ce31f96f" FOREIGN KEY ("playerId") REFERENCES "player"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "player_special_abilities" ADD CONSTRAINT "FK_487611504cf6c69f48bfaa11490" FOREIGN KEY ("specialAbilityId") REFERENCES "special_ability"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appearance_value" ADD CONSTRAINT "FK_d7cb6f89d98f87a9de825c51104" FOREIGN KEY ("appearanceId") REFERENCES "appearance"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league" ADD CONSTRAINT "FK_c6ed3a6e554028fd973d4110d51" FOREIGN KEY ("categoryId") REFERENCES "league_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "position" ADD CONSTRAINT "FK_17c798465bab141f90e7158f67a" FOREIGN KEY ("positionCategoryId") REFERENCES "position_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "setting_value" ADD CONSTRAINT "FK_bafeb20dc9cd9ad136ca25567a7" FOREIGN KEY ("settingId") REFERENCES "setting"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stadium" ADD CONSTRAINT "FK_943ac2366381d520fabe4c9f5c1" FOREIGN KEY ("stadiumAreaId") REFERENCES "stadium_area"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stadium" DROP CONSTRAINT "FK_943ac2366381d520fabe4c9f5c1"`);
        await queryRunner.query(`ALTER TABLE "setting_value" DROP CONSTRAINT "FK_bafeb20dc9cd9ad136ca25567a7"`);
        await queryRunner.query(`ALTER TABLE "position" DROP CONSTRAINT "FK_17c798465bab141f90e7158f67a"`);
        await queryRunner.query(`ALTER TABLE "league" DROP CONSTRAINT "FK_c6ed3a6e554028fd973d4110d51"`);
        await queryRunner.query(`ALTER TABLE "appearance_value" DROP CONSTRAINT "FK_d7cb6f89d98f87a9de825c51104"`);
        await queryRunner.query(`ALTER TABLE "player_special_abilities" DROP CONSTRAINT "FK_487611504cf6c69f48bfaa11490"`);
        await queryRunner.query(`ALTER TABLE "player_special_abilities" DROP CONSTRAINT "FK_8ded5b96f5c85150ab0ce31f96f"`);
        await queryRunner.query(`ALTER TABLE "player_settings" DROP CONSTRAINT "FK_04ab71bf328d7355c9d99363485"`);
        await queryRunner.query(`ALTER TABLE "player_settings" DROP CONSTRAINT "FK_88ef6813b9f2f73bb244b19d16d"`);
        await queryRunner.query(`ALTER TABLE "player_settings" DROP CONSTRAINT "FK_43ccfbeeabe06a10a1548d7b7ec"`);
        await queryRunner.query(`ALTER TABLE "player_positions" DROP CONSTRAINT "FK_ead63b28d2cfad4ad91ddfc294b"`);
        await queryRunner.query(`ALTER TABLE "player_positions" DROP CONSTRAINT "FK_92eaefdee1a617afa7b26fb347c"`);
        await queryRunner.query(`ALTER TABLE "player_appearances" DROP CONSTRAINT "FK_cdcdb7a0fc571934357f722cbed"`);
        await queryRunner.query(`ALTER TABLE "player_appearances" DROP CONSTRAINT "FK_1a29de4a84f8b832b7dd57a066e"`);
        await queryRunner.query(`ALTER TABLE "player_appearances" DROP CONSTRAINT "FK_02299af2bce6c636e3a5ee3dbd3"`);
        await queryRunner.query(`ALTER TABLE "player_abilities" DROP CONSTRAINT "FK_b1b8c1d051064300a9e6f338368"`);
        await queryRunner.query(`ALTER TABLE "player_abilities" DROP CONSTRAINT "FK_3b4c1ee71dc08f4750eaf293c36"`);
        await queryRunner.query(`ALTER TABLE "player_teams" DROP CONSTRAINT "FK_0693d48dc4eedae44367817327a"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_2b4c16ed072c7b227fdbc5c07cc"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_0eba600ad102afc15975a3f102c"`);
        await queryRunner.query(`ALTER TABLE "team" DROP CONSTRAINT "FK_36d02c93049412c8e95bd478de9"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "team" ADD "name" character varying(52) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "formationId"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "stadiumId"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "leagueId"`);
        await queryRunner.query(`ALTER TABLE "team" DROP COLUMN "short"`);
        await queryRunner.query(`DROP TABLE "special_ability"`);
        await queryRunner.query(`DROP TABLE "stadium_area"`);
        await queryRunner.query(`DROP TABLE "stadium"`);
        await queryRunner.query(`DROP TABLE "setting_value"`);
        await queryRunner.query(`DROP TABLE "setting"`);
        await queryRunner.query(`DROP TABLE "position"`);
        await queryRunner.query(`DROP TABLE "position_category"`);
        await queryRunner.query(`DROP TABLE "league_category"`);
        await queryRunner.query(`DROP TABLE "league"`);
        await queryRunner.query(`DROP TABLE "formation"`);
        await queryRunner.query(`DROP TABLE "appearance_value"`);
        await queryRunner.query(`DROP TABLE "appearance"`);
        await queryRunner.query(`DROP TABLE "ability"`);
        await queryRunner.query(`DROP TABLE "player_special_abilities"`);
        await queryRunner.query(`DROP TABLE "player_settings"`);
        await queryRunner.query(`DROP TABLE "player_positions"`);
        await queryRunner.query(`DROP TABLE "player_appearances"`);
        await queryRunner.query(`DROP TABLE "player_abilities"`);
        await queryRunner.query(`ALTER TABLE "player_teams" RENAME COLUMN "teamId" TO "teamsId"`);
        await queryRunner.query(`ALTER TABLE "player_teams" ADD CONSTRAINT "FK_5942ce03406f8604ff036aa0eb9" FOREIGN KEY ("teamsId") REFERENCES "team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
